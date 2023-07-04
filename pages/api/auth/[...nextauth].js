import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { json } from "stream/consumers";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                Email: { label: "Email", type: "text"},
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const res = await fetch('http://localhost:3000/api/login', {
                    method: 'POST',
                    body: JSON.stringify({
                        Email: credentials?.Email,
                        password: credentials?.password,
                    }),
                    headers: { "Content-Type": "application/json" }
                })
                const data = await res.json()

                if (data.status == "ok") {
                    return data.user
                }
                return res.json.error
            }
        })

    ], secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, user, account }) {
            if (account) {
                token.accessToken = account.access_token
                token.user = user
            }
            return token
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            session.accessToken = token.accessToken
            session.user = token.user
            return session
        }
    }, pages: {
        signIn: '/auth/login',
        signOut: '/auth/signout',
        error: '/auth/error', // Error code passed in query string as ?error=
        verifyRequest: '/auth/verify-request', // (used for check email message)
        newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    }, events: {
        async signIn(message) { /* on successful sign in */ },
        async signOut(message) { /* on signout */ },
        async createUser(message) { /* user created */ },
        async updateUser(message) { /* user updated - e.g. their email was verified */ },
        async linkAccount(message) { /* account (e.g. Twitter) linked to a user */ },
        async session(message) { /* session is active */ },
    }
}
export default NextAuth(authOptions)