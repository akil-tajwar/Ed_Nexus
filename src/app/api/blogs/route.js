import Blogs from "@/models/blogs/blogsModel";
import bdConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";


export async function POST(req) {
    const { blogs_id, image, title, content, date } = req.json()

    await bdConnect();
    try {
        const blogs = await Blogs.create({
            blogs_id, image, title, author, content, date
        });
        return NextResponse.json(blogs);
    } catch (error) {
        return NextResponse.json({
            meg: "data not added",
        });
    }
    // console.log(fastName, lastName)
    // return NextResponse.json({ message: "blog page." }, { status: 201 });
}
export async function GET(req) {
    await bdConnect();
    try {
        const data = await Blogs.find();
        return NextResponse.json(data);
    } catch (error) { }
    // return NextResponse.json({ message: "blog page." }, { status: 201 });
}