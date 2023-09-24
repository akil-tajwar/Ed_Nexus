import Blogs from "@/models/blogs/blogsModel";
import bdConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export async function PUT(request, content) {
  await bdConnect();
  const blogId = content.params.id;
  const { loggedInUserEmail } = await request.json();
  //   console.log("server", loggedInUserEmail);

  try {
    const blog = await Blogs.findById(blogId);
    console.log(blog);

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    // Check if user's email is in the dislike array
    const dislikeIndex = blog.dislike.findIndex(
      (dislikeObj) => dislikeObj.userEmail === loggedInUserEmail
    );

    if (dislikeIndex !== -1) {
      // Remove user's email from the dislike array
      blog.dislike.splice(dislikeIndex, 1);
    }

    // Check if user's email is already in the like array
    const likeIndex = blog.like.findIndex(
      (likeObj) => likeObj.userEmail === loggedInUserEmail
    );

    if (likeIndex === -1) {
      // Add user's email to the like array
      blog.like.push({ userEmail: loggedInUserEmail });
    } else {
      // Remove user's email from the like array (if already liked, this will toggle it)
      blog.like.splice(likeIndex, 1);
    }

    await blog.save();

    return NextResponse.json(
      { message: "Like updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
