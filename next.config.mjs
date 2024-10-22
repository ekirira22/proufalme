/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
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
