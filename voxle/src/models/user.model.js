import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
    {
        username: { type: String, required: [true, 'Username is required'], unique: true, lowercase: true, trim: true, index: true },
        email: { type: String, required: [true, 'Email is required'], unique: true, lowercase: true, trim: true },
        fullName: { type: String, required: [true, 'Full name is required'], trim: true, index: true },
        avatar: { type: String, required: [true, 'Avatar is required'] },
        coverImage: { type: String },
        watchHistory: [{ type: Schema.Types.ObjectId, ref: "Video" }],
        password: { type: String, required: [true, 'Password is required'] },
        refreshToken: { type: String },
    },
    {
        timestamps: true,
    }
);

export const User = mongoose.model("User", UserSchema);