import { NextResponse } from "next/server"
import VideoPage from "@/app/video/page"

export async function GET(req) {
    return NextResponse.json({ message: "Video Page Loaded", VideoPage }, { status: 201 })
}