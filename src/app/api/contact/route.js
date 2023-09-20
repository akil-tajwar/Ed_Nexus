import Contact from "@/models/contact/contactModel";
import bdConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { name, email, description, createdAt, updatedAt } =
    await request.json();

  await bdConnect();
  try {
    const contact = await Contact.create({
      name, email, description, createdAt, updatedAt
    });
    return NextResponse.json(contact);
  } catch (error) {
    return NextResponse.json({
      meg: "data not added",
    });
  }
}

export async function GET() {
  await bdConnect();
  try {
    const data = await Contact.find();
    return NextResponse.json(data);
  } catch (error) { }
}
