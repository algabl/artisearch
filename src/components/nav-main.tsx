"use client";

import type { Icon } from "lucide-react";
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";

export function NavMain({
    items,
}: {
    items: {
        title: string;
        url: string;
        icon?: typeof Icon;
    }[];
}) {
    const location = useLocation();
    const { setOpenMobile } = useSidebar();
    // Get active item from the location.pathname, active item is the item that most closely matches the pathname
    const activeItem = items.reduce((bestMatch, item) => {
        if (location.pathname.startsWith(item.url) && item.url.length > (bestMatch?.url.length ?? 0)) {
            return item;
        }
        return bestMatch;
    }, undefined as (typeof items)[0] | undefined);
    return (
        <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
                <SidebarMenu></SidebarMenu>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <Link to={item.url} onClick={() => setOpenMobile(false)}>
                                <SidebarMenuButton tooltip={item.title} isActive={item === activeItem}>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
