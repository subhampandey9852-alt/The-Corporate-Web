import { NextResponse } from "next/server";
import { getQueries, addQuery } from "../../../lib/db";
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
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const queries = await getQueries();
    return NextResponse.json({ success: true, queries });
  } catch (error) {
    console.error("GET queries error:", error);
    return NextResponse.json({ error: "Failed to fetch queries" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const queryData = await req.json();
    
    if (!queryData.name || !queryData.email || !queryData.subject || !queryData.message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const newQuery = await addQuery(queryData);
    return NextResponse.json({ success: true, query: newQuery });
  } catch (error) {
    console.error("POST query error:", error);
    return NextResponse.json({ error: "Failed to submit query" }, { status: 500 });
  }
}
