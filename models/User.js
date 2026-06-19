import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "admin" }
  },
  { timestamps: true, collection: "User" }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
