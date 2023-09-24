import Blogs from "@/models/blogs/blogsModel";
import bdConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export async function POST(request, content) {
  const blogId = content.params.id;
  const { userName, userImage, userEmail, comment, createdAt, updatedAt } =
    await request.json();
  // console.log(
  //   blogId,
  //   userName,
  //   userImage,
  //   userEmail,
  //   comment,
  //   createdAt,
  //   updatedAt
  // );
  await bdConnect();
  try {
    const blog = await Blogs.findOne({
      _id: blogId,
    });
    if (blog) {
      blog.comment.push({
        userName,
        userImage,
        userEmail,
        comment,
        createdAt,
        updatedAt,
      });
      await blog.save();
      return NextResponse.json(
        { blog, success: true, message: "Successfully comment the blog" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid Blog ID" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json({
      meg: "comment not added",
    });
  }
}
