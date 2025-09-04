"use client";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarSeparator,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { VideoIcon, Bot, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DashboardUserButton from "./dashboard-user-button";

const firstSection = [
    {
        label: "Meetings",
        icon: VideoIcon,
        href: "/meetings",
    },
    {
        label: "Agents",
        icon: Bot,
        href: "/agents",
    },
];

const secondSection = [
    {
        label: "Upgrade",
        icon: Star,
        href: "/upgrade",
    },
];

export const DashboardSidebar = () => {
    const pathname = usePathname();
    return (
        <Sidebar className="bg-white border-r border-gray-200">
            <SidebarHeader className="bg-white border-b border-gray-200">
                <Link href="/" className="flex items-center gap-2 px-2 pt-2 pb-2">
                    <Image src="/logo.svg" alt="MeetAI Logo" width={36} height={36} />
                    <p className="text-2xl font-semibold text-black">MeetAI</p>
                </Link>
            </SidebarHeader>
            
            <SidebarContent className="bg-white">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {firstSection.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton
                                        className={cn(
                                            "bg-white text-black hover:bg-gray-300  transition-colors duration-200 group",
                                            pathname === item.href && "bg-gray-200"
                                        )}
                                        isActive={pathname === item.href}
                                    >
                                        <Link href={item.href} className="flex items-center w-full">
                                            <item.icon className={cn(
                                                "h-5 w-5 mr-3 text-black group-hover:text-black transition-colors duration-200"
                                            )} />
                                            <span className="text-sm font-medium tracking-tight">{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <div className="px-4 py-2">
                    <Separator className="h-px bg-gray-200" />
                </div>

                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {secondSection.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton
                                        className={cn(
                                            "bg-white text-black hover:bg-gray-300  transition-colors duration-200 group"
                                        )}
                                    >
                                        <Link href={item.href} className="flex items-center w-full">
                                            <item.icon className={cn(
                                                "h-5 w-5 mr-3 text-black group-hover:text-black transition-colors duration-200"
                                            )} />
                                            <span className="text-sm font-medium tracking-tight">{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="bg-white border-t border-gray-200 p-4">
                <DashboardUserButton />
            </SidebarFooter>
        </Sidebar>
    )
}