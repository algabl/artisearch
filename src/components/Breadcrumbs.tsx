import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import { NavLink } from "react-router-dom";

export default function Breadcrumbs() {
    const { breadcrumbs, removeBreadcrumbsAfter } = useBreadcrumbs();

    return (
        <Breadcrumb className="py-2 max-w-full overflow-hidden">
            <BreadcrumbList className="flex-wrap gap-1 sm:flex-nowrap">
                {breadcrumbs.map((crumb, index) => {
                    const isLast = index === breadcrumbs.length - 1;

                    return (
                        <BreadcrumbItem key={crumb.path} className="flex items-center">
                            {index > 0 && (
                                <ul>
                                    <BreadcrumbSeparator />
                                </ul>
                            )}
                            {isLast ? (
                                <BreadcrumbPage className="truncate max-w-[200px]">{crumb.label}</BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink asChild>
                                    <NavLink
                                        viewTransition
                                        to={crumb.path}
                                        onClick={() => removeBreadcrumbsAfter(crumb.path)}
                                        className="truncate max-w-[150px] hover:max-w-full transition-all duration-300"
                                    >
                                        {crumb.label}
                                    </NavLink>
                                </BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
