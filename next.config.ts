import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    useRouter: true,
    images: {
        domains: ["www.artic.edu"],
    },
};

export default nextConfig;
