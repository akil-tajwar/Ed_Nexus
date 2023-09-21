import Courses from "@/models/courses/coursesModel"
import bdConnect from "@/utils/dbConnect"
import { NextResponse } from "next/server"


export async function POST(request) {
    const { courseName, picture, password, chatID, chatAccessKey, members, ownerName, ownerEmail } = await request.json()
    await bdConnect()
    try {
        const courses = await Courses.create({ courseName, picture, password, chatID, chatAccessKey, members, ownerName, ownerEmail })
        // console.log("from course route after create",courses);
        return NextResponse.json({ course: courses, message: "successfully added data" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            message: "data not added",
            status: 500
        })
    }
}

export async function GET(request) {
    await bdConnect();
    try {
        const courses = await Courses.find({}); // Retrieve all courses
        return NextResponse.json({ courses }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: "Failed to retrieve courses",
            status: 500,
        });
    }
}