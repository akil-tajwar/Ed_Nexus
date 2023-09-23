import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";

const blogsSchema = new Schema({
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
    createdAt: {
        type: String,
    },
    updatedAt: {
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
const Blogs = models.blogs || model("blogs", blogsSchema);

export default Blogs;