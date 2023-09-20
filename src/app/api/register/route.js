import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import bdConnect from "@/utils/dbConnect";
import User from "@/models/userModels/userModel";

export async function POST(request) {
    const { name, email, password, picture } = await request.json();
    console.log(name, email, password, picture, 'register router')

    try {
        await bdConnect()
        const exsistUser = await User.findOne({ email: email })
        console.log(exsistUser)
        if (exsistUser) {
            return NextResponse.json({ meg: 'user alredy exsist' })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ name, email, password: hashedPassword, image: picture });

        return NextResponse.json({ user: newUser, message: "User registered." }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "An error occurred while registering the user." },
            { status: 500 }
        );
    }
}


export async function GET(req) {
    return NextResponse.json({ message: "User registered." }, { status: 201 });
}