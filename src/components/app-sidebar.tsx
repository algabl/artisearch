import * as React from "react";
import { Heart, Home, Images, Users } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { ModeToggle } from "./mode-toggle";

const data = {
    navMain: [
        {
            title: "Home",
            url: "/",
            icon: Home,
        },
        {
            title: "Artworks",
            url: "/artworks",
            icon: Images,
        },
        {
            title: "Artists",
            url: "/artists",
            icon: Users,
        },
        {
            title: "Favorites",
            url: "/artworks/favorites",
            icon: Heart,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
                            <a href="#">
                                <img src="/artisearch.svg" alt="Artisearch" width={32} height={32} className="h-8 w-8 rounded-full" />
                                {/* <IconInnerShadowTop className="!size-5" /> */}
                                <span className="text-base font-semibold">Artisearch</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                {/* <NavDocuments items={data.documents} /> */}
            </SidebarContent>
            <SidebarFooter>
                <ModeToggle />
            </SidebarFooter>
        </Sidebar>
    );
}
