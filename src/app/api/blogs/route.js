import Blogs from "@/models/blogs/blogsModel";
import bdConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { image, title, author,content, createdAt, updatedAt,like,dislike,comment } =
      await request.json();
    console.log(image, title, author,content, createdAt, updatedAt,like,dislike,comment)
    await bdConnect();
    try {
      const blog = await Blogs.create({
        image, title, author,content, createdAt, updatedAt,like,dislike,comment
      });
      return NextResponse.json(blog);
    } catch (error) {
      return NextResponse.json({
        meg: "data not added",
      });
    }
  }

export async function GET(req) {
  await bdConnect();
  try {
    const data = await Blogs.find();
    return NextResponse.json(data);
  } catch (error) {}
}
