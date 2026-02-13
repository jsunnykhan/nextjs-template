"use client";

import { usePathname } from "next/navigation";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";

function SidebarHeader() {
	const pathname = usePathname();
	const paths = pathname.split("/").filter((p) => !!p);

	return (
		<header className="flex h-16 shrink-0 items-center gap-2">
			<div className="flex items-center gap-2 px-4">
				<SidebarTrigger className="-ml-1" />
				<Separator
					orientation="vertical"
					className="mr-2 data-[orientation=vertical]:h-4"
				/>
				<Breadcrumb>
					<BreadcrumbList>
						{paths.map((path, index) =>
							paths.length - 1 === index ? (
								<div key={path} className="flex items-center">
									<BreadcrumbItem>
										<BreadcrumbPage className="capitalize">
											{path}
										</BreadcrumbPage>
									</BreadcrumbItem>
									{paths.length - 1 !== index && (
										<BreadcrumbSeparator className="hidden md:block" />
									)}
								</div>
							) : (
								<div key={path} className="flex items-center">
									<BreadcrumbItem className="hidden md:block">
										<BreadcrumbLink href={path} className="capitalize">
											{path}
										</BreadcrumbLink>
									</BreadcrumbItem>
									{paths.length - 1 !== index && (
										<BreadcrumbSeparator className="hidden md:block" />
									)}
								</div>
							),
						)}
					</BreadcrumbList>
				</Breadcrumb>
			</div>
		</header>
	);
}

export default SidebarHeader;
