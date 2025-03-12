import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { useBreadcrumbs } from "@/context/BreadcrumbContext";
import { cn } from "@/lib/utils";

export default function Breadcrumbs() {
    const { crumbs } = useBreadcrumbs();

    return (
        <Breadcrumb className="py-2 max-w-full overflow-hidden">
            <BreadcrumbList className="flex-wrap gap-1 sm:flex-nowrap">
                {crumbs.map((crumb, index) => {
                    const isLast = index === crumbs.length - 1;
                    const isFirst = index === 0;

                    return (
                        <BreadcrumbItem key={crumb.path} className={cn("flex items-center", !isFirst && "hidden sm:flex", isLast && "flex")}>
                            {index > 0 && <BreadcrumbSeparator />}
                            {isLast ? (
                                <BreadcrumbPage className="truncate max-w-[200px]">{crumb.label}</BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink asChild>
                                    <Link to={crumb.path} className="truncate max-w-[150px] hover:max-w-full transition-all duration-300">
                                        {crumb.label}
                                    </Link>
                                </BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
