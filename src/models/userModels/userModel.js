import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
    },
    image: {
        type: String,
        defalut: 'https://i.ibb.co/GW2pwSv/google.png'
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        enum: ['member', 'teacher', 'admin'],
        default: 'member'
    },
    provider: {
        type: String,
        default: 'credentials'
    }
}, { timestamps: true })

const User = models.user || model('user', userSchema);

export default User;