"use client";

import { ErrorBoundary } from "react-error-boundary";
import { toast } from "sonner";
function ErrorFallback({ error }: { error: Error }) {
    toast.error(error.message);
    return <p>Something went wrong. Please try again.</p>;
}

export function GlobalErrorBoundary({ children }: { children: React.ReactNode }) {
    return <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>;
}
