import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";

const blogsSchema = new Schema({
    blogs_id: {
        type: String,
    },
    image: {
        type: String,
    },
    title: {
        type: String,
    },
    author: {
        type: String,
    },
    content: {
        type: String,
    },
    Date: {
        type: String,
    },
    like: {
        type: Number,
    },
    dislike: {
        type: Number,
    },
    comment: [
        {
            userName: {
                type: String,
            },
            userPicture: {
                type: String,
            },
            comment: {
                type: String,
            }
        }
    ]
}, { timestamps: true })
const Blogs = models.Blogs || model("Blogs", blogsSchema);

export default Blogs;