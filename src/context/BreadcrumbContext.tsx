import { BreadcrumbContext } from "@/hooks/useBreadcrumbs";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export interface Breadcrumb {
    label: string;
    path: string;
}

export interface BreadcrumbContextType {
    breadcrumbs: Breadcrumb[];
    addBreadcrumb: (breadcrumb: Breadcrumb) => void;
    removeBreadcrumbsAfter: (path: string) => void;
    popCrumb: () => void;
}

export function BreadcrumbProvider({ children }: { children: React.ReactNode }) {
    const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([{ label: "Home", path: "/" }]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (breadcrumbs.length > 1 && location.pathname !== breadcrumbs[breadcrumbs.length - 1].path) {
            popCrumb();
        }
    }, [location, breadcrumbs]);

    const addBreadcrumb = (breadcrumb: Breadcrumb) => {
        setBreadcrumbs((prev) => {
            const exists = prev.find((b) => b.path === breadcrumb.path);
            if (exists) return prev;
            return [...prev, breadcrumb];
        });
    };

    const removeBreadcrumbsAfter = useCallback(
        (path: string) => {
            setBreadcrumbs((prev) => {
                const index = prev.findIndex((b) => b.path === path);
                if (index === -1) return prev;
                return prev.slice(0, index + 1);
            });
            navigate(path);
        },
        [navigate]
    );

    const popCrumb = () => {
        setBreadcrumbs((prev) => {
            if (prev.length <= 1) return prev;
            const newCrumbs = [...prev];
            newCrumbs.pop();
            return newCrumbs;
        });
    };

    return (
        <BreadcrumbContext.Provider value={{ breadcrumbs, addBreadcrumb, removeBreadcrumbsAfter, popCrumb }}>{children}</BreadcrumbContext.Provider>
    );
}
