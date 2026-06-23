import { NextResponse } from "next/server";
import { getRooms, addRoom, updateRoom, deleteRoom } from "../../../lib/db";
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

export async function GET() {
  try {
    const rooms = await getRooms();
    return NextResponse.json({ success: true, rooms });
  } catch (error) {
    console.error("GET rooms error:", error);
    return NextResponse.json({ error: "Failed to fetch rooms" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const roomData = await req.json();
    const newRoom = await addRoom(roomData);
    return NextResponse.json({ success: true, room: newRoom });
  } catch (error) {
    console.error("POST room error:", error);
    return NextResponse.json({ error: "Failed to add room" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const roomData = await req.json();
    const { id, ...updateData } = roomData;
    if (!id) {
      return NextResponse.json({ error: "Room ID is required" }, { status: 400 });
    }

    const updatedRoom = await updateRoom(id, updateData);
    return NextResponse.json({ success: true, room: updatedRoom });
  } catch (error) {
    console.error("PUT room error:", error);
    return NextResponse.json({ error: "Failed to update room" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Room ID is required" }, { status: 400 });
    }

    await deleteRoom(id);
    return NextResponse.json({ success: true, message: "Room deleted successfully" });
  } catch (error) {
    console.error("DELETE room error:", error);
    return NextResponse.json({ error: "Failed to delete room" }, { status: 500 });
  }
}
