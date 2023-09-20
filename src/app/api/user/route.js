import User from "@/models/userModels/userModel";
import bdConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export async function POST(request) {
  const {
    user_id,
    image,
    name,
    email,
    role,
    enrolled_courses,
    created_courses,
  } = await request.json();

  await bdConnect();
  try {
    const user = await User.create({
      user_id,
      image,
      name,
      email,
      role,
      enrolled_courses,
      created_courses,
    });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({
      meg: "data not added",
    });
  }
}

export async function GET() {
  await bdConnect();
  try {
    const data = await User.find();
    return NextResponse.json(data);
  } catch (error) { }
}
