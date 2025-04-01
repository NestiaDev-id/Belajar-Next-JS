import {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";

const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            type: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                fullname: { label: "Full Name", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credential) {
                const {email, password, fullname} = credential as { email: string; password: string, fullname: string };
                const user  : any = {id: 1, email, password, fullname}
                if (user) {
                    return user
                } else {
                    return null
                }
                // const res = await fetch("http://localhost:3000/api/auth/login",{})
            }
        })
    ],
    callbacks: {
         jwt({token, account, profile, user} : any) {
            if (account?.provider === "credentials") {
                token.email = user.email
                token.fullname = user.fullname
            }
            return token
        },
        async session({session, token}: any) {
            if (token) {
                session.user.email = token.email
                session.user.fullname = token.fullname
            }
            return session
        }
    }
}
export default NextAuth(authOptions)