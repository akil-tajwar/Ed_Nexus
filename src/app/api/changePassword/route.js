import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import User from "@/models/userModels/userModel";
import { NextResponse } from "next/server";
import bdConnect from "@/utils/dbConnect";
import bcrypt from 'bcryptjs';


export async function PUT(request) {
    const { current_password, password } = await request.json();
    console.log(current_password, password)
    const session = await getServerSession(authOptions)
    const id = session?.user?._id;
    console.log(id)
    try {
        await bdConnect()
        const user = await User.findById(id)
        console.log(user)
        const isPasswordValid = await bcrypt.compare(current_password, user.password);
        if (!isPasswordValid) throw new error('Your Current password is wrong')
        await User.findByIdAndUpdate(session?.user?._id, { password }, { new: true }).select('-password')
        return NextResponse.json({ message: "User update" }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "An error occurred while registering the user." },
            { status: 500 }
        );
    }
}