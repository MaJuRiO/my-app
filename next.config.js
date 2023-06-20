/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    /* config options here */
    env: {
        NEXT_PUBLIC_MAPBOX_API_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN,
    },
}

module.exports = nextConfig