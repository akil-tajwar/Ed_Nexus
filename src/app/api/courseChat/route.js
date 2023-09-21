import { NextResponse } from "next/server"
import CourseChat from "@/app/courseChat/page"

export async function GET(req) {
    return NextResponse.json({ message: "Chat Page Loaded", CourseChat }, { status: 201 })
}

