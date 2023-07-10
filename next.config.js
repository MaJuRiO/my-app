module.exports = {
    async rewrites() {
        return [
            {
                source: '/dashboard/:path*',
                destination: '/', // The :path parameter is used here so will not be automatically passed in the query
            },
        ]
    },
}