import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";


const notificationSchema = new Schema(
    {
        image: {
            type: String,
        },
        description: {
            type: String,
        },
        createdAt: {
            type: String,
        },
        updatedAt: {
            type: String,
        },

    }, { timestamps: true })

    const Notification = models.notifications || model("notifications", notificationSchema);


export default Notification;


