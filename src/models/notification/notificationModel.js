import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";

const notificationSchema = new Schema(
  {
    userEmail: {
      type: String,
    },
    ownerImage: {
      type: String,
    },
    message: {
      type: String,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: String,
    },
    updatedAt: {
      type: String,
    },
  },
  { timestamps: true }
);

const Notification =
  models.notifications || model("notifications", notificationSchema);

export default Notification;
