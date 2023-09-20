import Notices from "@/models/notices/notices.model";
import bdConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { course_id, title, description, createdAt, updatedAt } = await request.json();

  await bdConnect();
  try {
    const notice = await Notices.create({
      course_id, title, description, createdAt, updatedAt
    });
    return NextResponse.json(notice);
  } catch (error) {
    return NextResponse.json({
      meg: "data not added",
    });
  }
}

export async function GET() {
  await bdConnect();
  try {
    const data = await Notices.find();
    return NextResponse.json(data);
  } catch (error) { }
}
