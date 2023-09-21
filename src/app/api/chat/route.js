import { NextResponse } from "next/server"
import AllChat from "@/app/chat/page"

export async function GET(req) {
    return NextResponse.json({ message: "Chat Page Loaded", AllChat }, { status: 201 })
}