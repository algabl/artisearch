import { createContext, useContext, useState, ReactNode } from "react";
import { BreadcrumbContext } from "@/hooks/useBreadcrumbs";
export interface Crumb {
    label: string;
    path: string;
}

export interface BreadcrumbContextType {
    crumbs: Crumb[];
    setCrumbs: (crumbs: Crumb[]) => void;
    pushCrumb: (crumb: Crumb) => void;
    popCrumb: () => void;
    readTopCrumb: () => Crumb;
}

export function BreadcrumbProvider({ children }: { children: ReactNode }) {
    const [crumbs, setCrumbs] = useState<Crumb[]>([{ label: "Home", path: "/" }]);

    const pushCrumb = (crumb: Crumb) => {
        setCrumbs((prev) => [...prev, crumb]);
        console.log("pushing crumb", crumb);
        console.log("crumbs", crumbs);
    };

    const popCrumb = () => {
        setCrumbs((prev) => prev.slice(0, -1));
    };

    const readTopCrumb = () => {
        return crumbs[crumbs.length - 1];
    };
    return <BreadcrumbContext value={{ crumbs, setCrumbs, pushCrumb, popCrumb, readTopCrumb }}>{children}</BreadcrumbContext>;
}

// export function useBreadcrumbs() {
//     const context = useContext(BreadcrumbContext);
//     if (context === undefined) {
//         throw new Error("useBreadcrumbs must be used within a BreadcrumbProvider");
//     }
//     return context;
// }
