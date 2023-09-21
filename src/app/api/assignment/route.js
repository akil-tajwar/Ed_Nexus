import Assignments from "@/models/assignment/assignmentsModel";
import bdConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { course_id, title, description, due_date, attachments, submissions, topic, total_mark, createdAt, updatedAt } = await request.json();

  await bdConnect();
  try {
    const assignment = await Assignments.create({
      course_id, title, description, due_date, attachments, submissions, topic, total_mark, createdAt, updatedAt
    });
    return NextResponse.json(assignment);
  } catch (error) {
    return NextResponse.json({
      meg: "data not added",
    });
  }
}

export async function GET() {
  await bdConnect();
  try {
    const data = await Assignments.find();
    return NextResponse.json(data);
  } catch (error) { }
}
