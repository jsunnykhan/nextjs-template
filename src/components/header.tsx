"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";

const Header = () => {
	const { data: session } = authClient.useSession();

	const [open, setOpen] = useState<boolean>(false);

	return (
		<header className="min-h-[64px] px-6 flex items-center justify-between bg-gray-100 text-gray-800 shadow-sm">
			<div className="relative">
				<Button
					onClick={() => setOpen(!open)}
					className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200 transition"
				>
					<span>{session?.user?.name}</span>
					{/** biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
					<svg
						className="w-4 h-4"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</Button>

				{/* Dropdown */}
				{open && (
					<div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-md z-10 border border-gray-200">
						<div className="px-4 py-2 text-sm text-gray-600">
							{session?.user.email}
						</div>
						<hr className="border-gray-200" />
						<p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
							Profile
						</p>
						<p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
							Sign out
						</p>
					</div>
				)}
			</div>
		</header>
	);
};

export default Header;
