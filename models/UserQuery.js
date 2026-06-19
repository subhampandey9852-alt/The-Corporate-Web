import mongoose from "mongoose";

const UserQuerySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true }
  },
  { timestamps: true, collection: "user_query" }
);

export default mongoose.models.UserQuery || mongoose.model("UserQuery", UserQuerySchema);
