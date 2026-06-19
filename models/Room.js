import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 5.0 },
    reviews: { type: Number, default: 0 },
    image: { type: String, required: true },
    description: { type: String, required: true },
    size: { type: String, required: true },
    guests: { type: String, required: true },
    bed: { type: String, required: true },
    features: [{ type: String }]
  },
  { timestamps: true, collection: "Room" }
);

export default mongoose.models.Room || mongoose.model("Room", RoomSchema);
