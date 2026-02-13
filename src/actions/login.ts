"use server";

import { auth } from "@/lib/auth"; 
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signInWithEmailAction(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        return { error: "Email and Password are required" };
    }

    try {
        // Call the Custom Proxy Endpoint we defined in auth.ts
        // Cast to 'any' because custom endpoints are not automatically inferred on the typed client
        await (auth.api as any).signInWithEmail({
            body: { email, password },
            headers: await headers()
        });
        
    } catch (e) {
        // Better Auth throws on error, or returns error object?
        // With `auth.api`, it usually throws if response is not OK.
        return { error: "Invalid credentials" };
    }

    // Redirect on success
    redirect("/dashboard");
}

export async function signInWithSSOAction() {
    const res = await auth.api.signInSocial({
        body: { provider: "custom-sso" },
        asResponse: true,
        headers: await headers()
    });
    
    const redirectUrl = res.headers.get("Location");
    if (redirectUrl) {
        redirect(redirectUrl);
    }
}
