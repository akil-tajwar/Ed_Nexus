import Courses from "@/models/courses/coursesModel";
import bdConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { course_id, password, email, role, username, image } = await request.json();
    await bdConnect();

    try {
        const course = await Courses.findOne({
            _id: course_id,
            password,
        });

        if (course) {
            const existingMember = course.members.find(member => member.email === email);
            if (!existingMember) {
                course.members.push({ email, role, username, image });
                await course.save();
                return NextResponse.json({ success: true, message: "Successfully joined the class" }, { status: 200 });
            } else {
                return NextResponse.json({ success: false, message: "Already a member of the class" }, { status: 400 });
            }
        } else {
            return NextResponse.json({ success: false, message: "Invalid class ID or password" }, { status: 404 });
        }
    } catch (error) {
        console.error('Error joining class:', error);
        return NextResponse.json({ success: false, message: "Failed to join class" }, { status: 500 });
    }
}
