import { createContext, useContext, useState, ReactNode } from 'react';

export interface Crumb {
    label: string;
    path: string;
}

interface BreadcrumbContextType {
    crumbs: Crumb[];
    setCrumbs: (crumbs: Crumb[]) => void;
    pushCrumb: (crumb: Crumb) => void;
    popCrumb: () => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(undefined);

export function BreadcrumbProvider({ children }: { children: ReactNode }) {
    const [crumbs, setCrumbs] = useState<Crumb[]>([
        { label: 'Home', path: '/' }
    ]);

    const pushCrumb = (crumb: Crumb) => {
        setCrumbs(prev => [...prev, crumb]);
    };

    const popCrumb = () => {
        setCrumbs(prev => prev.slice(0, -1));
    };

    return (
        <BreadcrumbContext.Provider value={{ crumbs, setCrumbs, pushCrumb, popCrumb }}>
            {children}
        </BreadcrumbContext.Provider>
    );
}

export function useBreadcrumbs() {
    const context = useContext(BreadcrumbContext);
    if (context === undefined) {
        throw new Error('useBreadcrumbs must be used within a BreadcrumbProvider');
    }
    return context;
}