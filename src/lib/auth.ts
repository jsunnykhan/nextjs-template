import { betterAuth, CookieOptions } from "better-auth";
import { auth0, genericOAuth } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { createAuthEndpoint } from "better-auth/api";
import { z } from "zod";


const crossSiteCookieAttributes: CookieOptions = {
  sameSite: 'none',
  secure: true,
} as const;

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
    database: null, // Stateless Mode: No internal database
    secret: process.env.BETTER_AUTH_SECRET as string, 
    advanced: {
        cookies: {
            state: {
                attributes: {
                sameSite: "none",
                secure: true,
                },
            },
        },
    },
    plugins: [
        nextCookies(),
        // 1. Generic OAuth for Custom SSO
        genericOAuth({
            config: [
                
                {
                    providerId: "custom-sso", 
                    clientId: process.env.CUSTOM_SSO_CLIENT_ID as string,
                    clientSecret: process.env.CUSTOM_SSO_CLIENT_SECRET as string,
                    discoveryUrl: process.env.CUSTOM_SSO_AUTH_DISCOVERY as string,
                    authorizationUrl: process.env.CUSTOM_SSO_AUTH_URL,
                    pkce: true,
                    scopes: ["openid", "profile", "email"],
                    getToken: async ({ code, redirectURI, codeVerifier  }) => {
                    const response = await fetch(
                        process.env.CUSTOM_SSO_TOKEN_URL as string,
                        {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                        body: new URLSearchParams({
                            client_id: process.env.CUSTOM_SSO_CLIENT_ID as string,
                            client_secret: process.env.CUSTOM_SSO_CLIENT_SECRET as string,
                            code,
                            redirect_uri: redirectURI,
                            grant_type: "authorization_code",
                            code_verifier: codeVerifier as string
                        }),

                        }
                    )
                    if (!response.ok) {
                        const text = await response.text()
                        console.error("Token error:", text)
                        throw new Error("Token exchange failed")
                    }

                    const data = await response.json()

                    return {
                        accessToken: data.access_token,
                        refreshToken: data.refresh_token,
                        accessTokenExpiresAt: new Date(Date.now() + data.expires_in * 1000),
                        scopes: data.scope?.split(" ") ?? [],
                        raw: data,
                    }
                    },
                    getUserInfo: async (tokens) => {
                        // Access provider-specific fields from raw token data
                        const response = await fetch(
                        process.env.CUSTOM_SSO_USERINFO_URL as string,
                        {
                            headers:{
                                "Authorization" : `Bearer ${tokens.accessToken}`
                            }
                        }
                        );
                        const data = await response.json();
                        return {
                        id: data.sub,
                        name: data.name,
                        email: data.email,
                        image: data.avatar_url,
                        emailVerified: data.email_verified,
                        };
                    },
                }
            ]
        }),
        // 2. Proxy Endpoint for FastAPI Email/Password
        {
            id: "fastapi-proxy",
            endpoints: {
                signInWithEmail: createAuthEndpoint(
                    "/sign-in/email",
                    {
                        method: "POST",
                        body: z.object({
                            email: z.string().email(),
                            password: z.string()
                        })
                    },
                    async (ctx) => {
                        const { email, password } = ctx.body;

                        // Call FastAPI to validate credentials
                        // Update the URL to match your actual backend URL
                        const res = await fetch(`${process.env.BASE_URL || 'http://localhost:8000'}/auth/login`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ email, password })
                        });

                        if (!res.ok) {
                            throw new Error("Invalid Credentials");
                        }
                        
                        const userData = await res.json(); 

                        // Create a Stateless Session using internal adapter from context to avoid circular auth reference
                        const session = await ctx.context.internalAdapter.createSession(userData.id);

                        return { session, user: userData };
                    }
                )
            }
        }
    ]
});