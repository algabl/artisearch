import { useContext } from "react";
import { BreadcrumbContextType } from "@/context/BreadcrumbContext";
import { createContext } from "react";

export const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(undefined);

export function useBreadcrumbs(): BreadcrumbContextType {
    const context = useContext(BreadcrumbContext);
    if (!context) {
        throw new Error("useBreadcrumbs must be used within a BreadcrumbProvider");
    }
    return context;
}
