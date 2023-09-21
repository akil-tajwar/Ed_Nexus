import Resources from "@/models/resource/resourceModel";
import bdConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { course_id, title, description, attachments, createdAt, updatedAt } = await request.json();

  await bdConnect();
  try {
    const resources = await Resources.create({
      course_id, title, description, attachments, createdAt, updatedAt
    });
    return NextResponse.json(resources);
  } catch (error) {
    return NextResponse.json({
      meg: "data not added",
    });
  }
}

export async function GET() {
  await bdConnect();
  try {
    const data = await Resources.find();
    return NextResponse.json(data);
  } catch (error) { }
}