import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";

const blogsSchema = new Schema(
  {
    image: {
      type: String,
    },
    title: {
      type: String,
    },
    author: {
      type: String,
    },
    authorImage: {
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
    like: [
      {
        userEmail: {
          type: String,
        },
      },
    ],
    dislike: [
      {
        userEmail: {
          type: String,
        },
      },
    ],
    comment: [
      {
        userName: {
          type: String,
        },
        userImage: {
          type: String,
        },
        userEmail: {
          type: String,
        },
        comment: {
          type: String,
        },
        createdAt: {
          type: String,
        },
        updatedAt: {
          type: String,
        }
      },
    ],
  },
  { timestamps: true }
);
const Blogs = models.blogs || model("blogs", blogsSchema);

export default Blogs;
