import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    roomName: { type: String, required: true },
    roomId: { type: String, required: true },
    guestName: { type: String, required: true },
    phone: { type: String, required: true },
    checkInDate: { type: String, required: true },
    checkInTime: { type: String, required: true },
    checkOutDate: { type: String, required: true },
    checkOutTime: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ["Pending", "Confirmed", "Cancelled"], default: "Pending" },
    paymentMethod: { type: String, enum: ["Online Payment", "Cash Payment"], default: "Cash Payment" }
  },
  { timestamps: true, collection: "Booking" }
);

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
