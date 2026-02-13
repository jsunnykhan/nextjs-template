"use client";

import { signInWithEmailAction, signInWithSSOAction } from "@/actions/login";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormInputs>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = async (data: LoginFormInputs) => {
		const formData = new FormData();
		formData.append("email", data.email);
		formData.append("password", data.password);
		const res = await signInWithEmailAction(formData);

		if (!!res) {
		  const redirectUrl = new URL(searchParams.get('callbackUrl') || '/');
		  router.push(redirectUrl.pathname);
		}
	};

	return (
		<div className={"flex-col gap-6 w-md"}>
			<Card>
				<CardHeader>
					<CardTitle>Login to your account</CardTitle>
					<CardDescription>
						Enter your email below to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form noValidate onSubmit={handleSubmit(onSubmit)}>
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="email">Email</FieldLabel>
								<Input
									id="email"
									type="email"
									placeholder="m@example.com"
									required
									{...register("email")}
								/>
							</Field>
							<Field>
								<div className="flex items-center">
									<FieldLabel htmlFor="password">Password</FieldLabel>
									<Link
										href="/forget-password"
										className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
									>
										Forgot your password?
									</Link>
								</div>
								<Input
									id="password"
									type="password"
									required
									{...register("password")}
								/>
							</Field>
							<Field>
								<Button type="submit">Login</Button>
								<Button
									variant="outline"
									type="button"
									onClick={signInWithSSOAction}
								>
									Login with Google
								</Button>
								<FieldDescription className="text-center">
									Don&apos;t have an account? <Link href="#">Sign up</Link>
								</FieldDescription>
							</Field>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export default LoginPage;
