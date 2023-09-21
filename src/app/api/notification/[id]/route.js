import Notification from "@/models/notification/notificationModel";
import bdConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export async function GET(request, content) {
  const userEmail = content.params.id;
  await bdConnect();
  try {
    const data = await Notification.find({
      userEmail: userEmail,
      isRead: false,
    }).sort({ createdAt: -1 })
    .exec();
    return NextResponse.json(data);
  } catch (error) {}
}
