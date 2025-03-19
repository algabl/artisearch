import { BreadcrumbContextType } from "@/context/BreadcrumbContext";
import { use, createContext } from "react";

export const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(undefined);

export function useBreadcrumbs(): BreadcrumbContextType {
    const context = use(BreadcrumbContext);
    if (context === undefined) {
        throw new Error("useBreadcrumbs must be used within a BreadcrumbProvider");
    }
    return context;
}
