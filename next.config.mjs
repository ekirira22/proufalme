/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    reactStrictMode: true,
    images: {
        unoptimized: true, 
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'rrnajikqcljlkpvizolr.supabase.co',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'proufalme.org',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
