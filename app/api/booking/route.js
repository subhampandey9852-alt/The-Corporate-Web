import { NextResponse } from "next/server";
import { getBookings, addBooking, updateBooking } from "../../../lib/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "corporate-house-secret-key-123456";

// Auth helper
async function verifyAdmin() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    if (!token) return false;
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded && decoded.role === "admin";
  } catch {
    return false;
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const phone = searchParams.get("phone");

    const isAdmin = await verifyAdmin();
    const bookings = await getBookings();
    
    if (phone) {
      // Return full bookings detail for the user matching their phone number
      const userBookings = bookings.filter(b => b.phone === phone);
      return NextResponse.json({ success: true, bookings: userBookings });
    }
    
    if (!isAdmin) {
      // Exclude customer sensitive data for availability check
      const publicBookings = bookings.map(b => ({
        roomId: b.roomId,
        checkInDate: b.checkInDate,
        checkInTime: b.checkInTime,
        checkOutDate: b.checkOutDate,
        checkOutTime: b.checkOutTime,
        status: b.status
      }));
      return NextResponse.json({ success: true, bookings: publicBookings });
    }

    return NextResponse.json({ success: true, bookings });
  } catch (error) {
    console.error("GET bookings error:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const bookingData = await req.json();
    
    if (
      !bookingData.roomId ||
      !bookingData.roomName ||
      !bookingData.guestName ||
      !bookingData.phone ||
      !bookingData.checkInDate ||
      !bookingData.checkInTime ||
      !bookingData.checkOutDate ||
      !bookingData.checkOutTime ||
      !bookingData.totalPrice
    ) {
      return NextResponse.json({ error: "All booking details are required (including phone number)" }, { status: 400 });
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(String(bookingData.phone))) {
      return NextResponse.json({ error: "Phone number must be a valid 10-digit number." }, { status: 400 });
    }

    // Server-side check for date overlap availability
    const bookings = await getBookings();
    const isOverlapping = bookings.some(b => {
      if (b.roomId !== bookingData.roomId) return false;
      if (b.status === "Cancelled") return false;

      const newStart = new Date(`${bookingData.checkInDate}T${bookingData.checkInTime}`);
      const newEnd = new Date(`${bookingData.checkOutDate}T${bookingData.checkOutTime}`);
      const existStart = new Date(`${b.checkInDate}T${b.checkInTime}`);
      const existEnd = new Date(`${b.checkOutDate}T${b.checkOutTime}`);

      return newStart < existEnd && newEnd > existStart;
    });

    if (isOverlapping) {
      return NextResponse.json({ error: "This room is already booked for the selected dates/times." }, { status: 400 });
    }

    const newBooking = await addBooking(bookingData);
    return NextResponse.json({ success: true, booking: newBooking });
  } catch (error) {
    console.error("POST booking error:", error);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updateData = await req.json();
    const { id, status } = updateData;

    if (!id || !status) {
      return NextResponse.json({ error: "Booking ID and status are required" }, { status: 400 });
    }

    if (!["Pending", "Confirmed", "Cancelled"].includes(status)) {
      return NextResponse.json({ error: "Invalid booking status" }, { status: 400 });
    }

    const updatedBooking = await updateBooking(id, { status });
    return NextResponse.json({ success: true, booking: updatedBooking });
  } catch (error) {
    console.error("PUT booking error:", error);
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 });
  }
}
