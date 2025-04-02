import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import { signIn, signWithGoogle } from "@/lib/firebase/service";
import { compare } from "bcrypt";
import GoogleProvider from "next-auth/providers/google";

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
        password: { label: "Password", type: "password" },
      },
      async authorize(credential) {
        const { email, password } = credential as {
          email: string;
          password: string;
        };
        const user: any = await signIn({ email });

        if (user) {
          const passwordConfirm = await compare(password, user.password);
          if (passwordConfirm) {
            return user;
          }
          return user;
        } else {
          return null;
        }
        // const res = await fetch("http://localhost:3000/api/auth/login",{})
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === "credentials") {
        token.email = user.email;
        token.fullname = user.fullname;
        token.role = user.role;
      }
      if (account?.provider === "google") {
        const data = {
          fullname: user.name,
          email: user.email,
          image: user.image,
          type: "google",
        };
        try {
          const result = await signWithGoogle(data);
          if (result.status) {
            token.fullname = data.fullname;
            token.email = data.email;
            token.image = data.image;
            token.type = data.type;
            token.role = result.data.role;
          }
        } catch (error) {
          console.error("Error in Google sign-in:", error);
        }
      }
      return token;
    },
    async session({ session, token }: any) {
      // if (token) {
      //     session.user.fullname = token.fullname
      //     session.user.email = token.email
      //     session.user.role = token.role
      // }
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("fullname" in token) {
        session.user.fullname = token.fullname;
      }
      if ("role" in token) {
        session.user.role = token.role;
      }
      if ("image" in token) {
        session.user.image = token.image;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};
export default NextAuth(authOptions);
