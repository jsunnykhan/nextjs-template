import { betterAuth } from "better-auth";
import { genericOAuth } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { createAuthEndpoint } from "better-auth/api";
import { z } from "zod";

export const auth = betterAuth({
    database: null, // Stateless Mode: No internal database
    secret: process.env.BETTER_AUTH_SECRET || "configure_me_in_env", 
    
    plugins: [
        nextCookies(),
        // 1. Generic OAuth for Custom SSO
        genericOAuth({
            providerId: "custom-sso", 
            clientId: process.env.CUSTOM_SSO_CLIENT_ID as string,
            clientSecret: process.env.CUSTOM_SSO_CLIENT_SECRET as string,
            authorizationUrl: process.env.CUSTOM_SSO_AUTH_URL ,
            tokenUrl: process.env.CUSTOM_SSO_TOKEN_URL ,
            userInfoUrl: process.env.CUSTOM_SSO_USERINFO_URL ,
        } as any),
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