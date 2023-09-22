import Notification from "@/models/notification/notificationModel";
import bdConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { userEmail, ownerImage, message, isRead, createdAt, updatedAt } =
    await request.json();
  // console.log(userEmail, ownerImage, message, isRead, createdAt, updatedAt)
  await bdConnect();
  try {
    const notification = await Notification.create({
      userEmail,
      ownerImage,
      message,
      isRead,
      createdAt,
      updatedAt,
    });
    return NextResponse.json(notification);
  } catch (error) {
    return NextResponse.json({
      meg: "data not added",
    });
  }
}

export async function GET() {
  await bdConnect();
  try {
    const data = await Notification.find();
    return NextResponse.json(data);
  } catch (error) {}
}
