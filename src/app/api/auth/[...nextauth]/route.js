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
                try {
                    const user = await User.findOne({ email: email })
                    if (!user) {
                        return null;
                    }
                    const isPasswordValid = await bcrypt.compare(password, user.password);
                    if (!isPasswordValid) {
                        return null;
                    }
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
        async signIn({ user, account, profile, email, credentials }) {
            console.log({ account })
            console.log({ profile }, 'google provider')
            if (account.type === 'oauth') {
                return await signInWithOAuth({ account, profile })
            }
            return true;
        },
        async jwt({ token, trigger, session }) {
            console.log({ trigger, session }, 'form trigger')
            if (trigger === 'update') {
                token.user.name = session.name
            }
            else if (trigger === 'userUpdateProfile') {
                token.user.image = session.image
            }
            else {
                const user = await getUserByEmail({ email: token.email })
                token.user = user;
            }

            return token;
        },
        async session({ session, token }) {
            session.user = token.user
            return session;
        }
    },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }

async function signInWithOAuth({ account, profile }) {
    const user = await User.findOne({ email: profile.email })
    if (user) {
        return true
    }
    const newUser = new User({
        name: profile.name,
        email: profile.email,
        image: profile.picture,
        role: profile.role,
        provider: account.provider
    })
    await newUser.save()
    console.log(newUser)
    return true;
}

async function getUserByEmail({ email }) {
    const user = await User.findOne({ email }).select('-password')
    if (!user) throw new Error('Email does not exsist')

    return { ...user._doc, _id: user._id.toString() }
}