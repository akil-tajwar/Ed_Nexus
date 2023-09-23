import User from "@/models/userModels/userModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";



export async function PUT(request) {
    const { image } = await request.json();
    const session = await getServerSession(authOptions)
    try {
        await User.findByIdAndUpdate(session?.user?._id, { image }, { new: true }).select('-password')
        return NextResponse.json({ message: "User update" }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "An error occurred while registering the user." },
            { status: 500 }
        );
    }
}