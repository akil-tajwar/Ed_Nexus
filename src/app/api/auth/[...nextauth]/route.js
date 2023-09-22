import User from "@/models/userModels/userModel";
import bdConnect from "@/utils/dbConnect";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';

bdConnect()
export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "email", placeholder: "example@gmail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const { email, password } = credentials;
                console.log(email, password, 'from callback')
                try {
                    const user = await User.findOne({ email: email })
                    if (!user) {
                        return null;
                    }
                    const isPasswordValid = await bcrypt.compare(password, user.password);
                    if (!isPasswordValid) {
                        return null;
                    }
                    console.log(user, 'callback from user')
                    return user;
                } catch (error) {

                }
            }
        })

    ],
    pages: {
        signIn: '/login'
    },
    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        async signIn({ user, account, profile, email, role = "member", credentials }) {
            if (account.type === 'oauth') {
                return await signInWithOAuth({ account, profile })
            }
            console.log(user, 'from callback user main user')
            return true;
        },
        async jwt({ token, trigger, session }) {
            console.log(trigger, 'from jwt callbacks')
            return token;
        },
        async session({ session, token }) {
            return session;
        }
    },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }

async function signInWithOAuth({ account, profile }) {
    console.log(account)
    const user = await User.findOne({ email: profile.email })
    if (user) {
        return true
    }
    const newUser = new User({
        name: profile.name,
        email: profile.email,
        image: profile.picture,
        role: "member",
        provider: account.provider
    })
    await newUser.save()
    return true;
}