import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";


const coursesSchema = new Schema({
    courseName: {
        type: String,
        require: true
    },
    picture: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    chatID: {
        type: String,
        require: true
    },
    chatAccessKey: {
        type: String,
        require: true
    },
    members: [
        {
            email: {
                type: String,
                required: true,
            },
            role: {
                type: String,
                enum: ["owner", "student"],
                required: true,
            },
            username: {
                type: String,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
        },
    ],
    ownerName: {
        type: String,
        required: true,
    },
    ownerEmail: {
        type: String,
        required: true,
    },
    ownerImage: {
        type: String,
        required: true,
      },
}, { timestamps: true })

const Courses = models.Courses || model("Courses", coursesSchema);
export default Courses;
