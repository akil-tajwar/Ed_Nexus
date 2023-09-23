import User from "@/models/userModels/userModel";
import Courses from "@/models/courses/coursesModel";
import bdConnect from "@/utils/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function DELETE(request, content) {
  try {
    const session = await getServerSession(authOptions);
    const { user } = session;

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userEmail = content.params.id;

    if (!userEmail) {
      return NextResponse.json(
        { error: "Email not provided" },
        { status: 400 }
      );
    }

    await bdConnect();

    // Check if the user exists before deleting
    const existingUser = await User.findOne({ email: userEmail });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    // Delete the user
    await User.deleteOne({ email: userEmail });

    // Find courses owned by the user
    const courses = await Courses.find();

    // Remove user if he join other course
    for (const course of courses) {
      // Use the filter method to remove the user with the specified email
      course.members = course.members.filter(
        (member) => member.email !== userEmail
      );
    }

    //  Update courses after remove the user in the database with the modified members arrays
    for (const updatedCourse of courses) {
      await Courses.updateOne(
        { _id: updatedCourse._id },
        { members: updatedCourse.members }
      );
    }

    const coursesOwnedByUser = await Courses.find({ ownerName: user.name });

    for (const course of coursesOwnedByUser) {
      if (course.members.length === 1) {
        // If the user is the only member, delete the course
        await Courses.deleteOne({ _id: course._id });
      } else {
        // If there are other members, transfer ownership to the first member
        const newOwnerUsername = course.members[1].username;
        course.ownerName = newOwnerUsername;
        course.members[1].role = "owner";

        // Remove the previous owner from the members array
        course.members = course.members.filter(
          (member) => member.email !== userEmail
        );

        // Update the course in the database
        await Courses.updateOne(
          { _id: course._id },
          {
            ownerName: course.ownerName,
            members: course.members,
          }
        );
      }
    }

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting resource:", error);
    return NextResponse.json(
      { error: "Failed to delete resource" },
      { status: 500 }
    );
  }
}

export async function PUT(request, content) {
  try {
    const userEmail = content.params.id;

    if (!userEmail) {
      return NextResponse.json(
        { error: "Email not provided" },
        { status: 400 }
      );
    }

    // Connect to the database
    await bdConnect();

    const userToUpdate = await User.findOne({ email: userEmail });

    if (!userToUpdate) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    userToUpdate.role = "admin";

    await userToUpdate.save();

    return NextResponse.json(
      { message: "User updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
