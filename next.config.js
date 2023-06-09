/** @type {import('next').NextConfig} */
module.exports = {
    pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],
    api: {
        // Other API route configuration...
        runtime: "edge",
    },
};
