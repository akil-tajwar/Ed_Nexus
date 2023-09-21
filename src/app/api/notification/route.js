import Notification from "@/models/notification/notificationModel";
import bdConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  await bdConnect();
  try {
    const data = await Notification.find();
    return NextResponse.json(data);
  } catch (error) { }
}
