import dbConnect from "./mongodb";
import Room from "../models/Room";
import Booking from "../models/Booking";
import User from "../models/User";
import UserQuery from "../models/UserQuery";
import bcrypt from "bcryptjs";

// Expanded Default Rooms to seed if Room collection is empty
const DEFAULT_ROOMS = [
  {
    name: "Executive Double Room",
    category: "rooms",
    price: 1500,
    rating: 4.7,
    reviews: 142,
    image: "/photos/img4.jpg",
    description: "Bright and welcoming double room featuring a vibrant orange accent wall, patterned pillows and bed runner, individual air conditioning, and dark brown blackout curtains.",
    size: "35 m²",
    guests: "Up to 2 Guests",
    bed: "1 Double Bed",
    features: ["Individual Air Conditioning", "Vibrant Accent Wall", "Modern Wall Wardrobe", "Blackout Curtains"]
  },
  {
    name: "Deluxe Room with Sitting Area",
    category: "rooms",
    price: 1800,
    rating: 4.8,
    reviews: 215,
    image: "/photos/img7.jpg",
    description: "Spacious double room offering a comfortable bed, orange accent wall, wall-mounted television, wardrobe with a dressing mirror, and a cozy sitting area with a sofa chair and coffee table.",
    size: "45 m²",
    guests: "Up to 3 Guests",
    bed: "1 Double Bed",
    features: ["Wall-mounted TV", "Wardrobe with Mirror", "Cozy Sofa Seating", "Ceiling Fan & AC"]
  },
  {
    name: "Double Room with Study Desk",
    category: "rooms",
    price: 1600,
    rating: 4.6,
    reviews: 71,
    image: "/photos/img13.jpg",
    description: "Designed for business travelers needing a workspace, this room features a comfortable double bed, wall-mounted TV, individual climate controls, and a study desk with a modern green mesh chair.",
    size: "40 m²",
    guests: "Up to 2 Guests",
    bed: "1 Double Bed",
    features: ["Dedicated Work Desk", "Green Mesh Chair", "Wall-mounted TV", "Individual Climate Control"]
  },
  {
    name: "Premium Room with Sofa Lounge",
    category: "rooms",
    price: 1950,
    rating: 4.9,
    reviews: 89,
    image: "/photos/img19.jpg",
    description: "An expansive premium room featuring a comfortable double bed, a dedicated seating area with a plush brown sofa and coffee table, individual air conditioning, and elegant wooden wardrobes.",
    size: "48 m²",
    guests: "Up to 3 Guests",
    bed: "1 Double Bed",
    features: ["Plush Sofa Seating", "Coffee Table", "Individual Air Conditioning", "Premium Wooden Wardrobe"]
  },
  {
    name: "Smart Workstation Twin Room",
    category: "rooms",
    price: 1200,
    rating: 4.5,
    reviews: 64,
    image: "/photos/img10.jpg",
    description: "Twin-bed option designed for smart utility, featuring individual air conditioning, patterned pillows, high-speed Wi-Fi, and a convenient business workspace setup.",
    size: "30 m²",
    guests: "Up to 2 Guests",
    bed: "2 Twin Beds",
    features: ["Twin Beds", "High-speed Wi-Fi", "Workspace Desk", "Air Conditioning"]
  },
  {
    name: "Lobby View Classic Room",
    category: "rooms",
    price: 1400,
    rating: 4.6,
    reviews: 51,
    image: "/photos/img34.jpg",
    description: "Centrally located near the classic lobby seating area, featuring elegant design, traditional gold-themed accents, and easy access to resort amenities.",
    size: "38 m²",
    guests: "Up to 2 Guests",
    bed: "1 Double Bed",
    features: ["Gold Theme Decor", "Lobby Access", "Mini Bar", "Ensuite Bathroom"]
  },
  {
    name: "Terrace View Double Room",
    category: "rooms",
    price: 1550,
    rating: 4.7,
    reviews: 93,
    image: "/photos/img37.jpg",
    description: "Beautiful double room situated near the upper marble staircase terrace, featuring modern security lock access, full-length glass doors, and a scenic view.",
    size: "36 m²",
    guests: "Up to 2 Guests",
    bed: "1 Double Bed",
    features: ["Terrace View", "Full-length Glass Doors", "Smart Lock Entry", "Comfortable Recliner"]
  },
  {
    name: "Staircase Side Cozy Room",
    category: "rooms",
    price: 1100,
    rating: 4.3,
    reviews: 42,
    image: "/photos/img16.jpg",
    description: "Compact and extremely cozy double room conveniently situated near the marble staircase lobby. Perfect for brief business stopovers.",
    size: "28 m²",
    guests: "Up to 2 Guests",
    bed: "1 Double Bed",
    features: ["Compact Design", "Staircase Access", "AC", "Smart TV"]
  },
  {
    name: "Front Desk Access Room",
    category: "rooms",
    price: 1300,
    rating: 4.5,
    reviews: 58,
    image: "/photos/img31.jpg",
    description: "Ground level double room with quick access to the reception lobby desk. Features warm lighting and a highly functional layout.",
    size: "32 m²",
    guests: "Up to 2 Guests",
    bed: "1 Double Bed",
    features: ["Quick Reception Access", "Warm Lighting", "Private Safe", "Ensuite Bathroom"]
  },
  {
    name: "Exclusive Luxury Penthouse Suite",
    category: "suites",
    price: 3500,
    rating: 5.0,
    reviews: 12,
    image: "/photos/img19.jpg",
    description: "Our signature luxury penthouse suite offering premium panoramic views of the coast, private terrace dining, top-tier audio systems, and a personal butler service.",
    size: "120 m²",
    guests: "Up to 4 Guests",
    bed: "1 King Bed & 1 Sofa Bed",
    features: ["Panoramic Coast View", "Private Terrace", "Personal Butler", "Top-tier Audio System", "Luxury Bathroom"]
  }
];

export async function getRooms() {
  await dbConnect();
  const count = await Room.countDocuments({});
  if (count === 0) {
    await Room.insertMany(DEFAULT_ROOMS);
  }
  return await Room.find({}).lean();
}

export async function addRoom(roomData) {
  await dbConnect();
  const created = await Room.create(roomData);
  return created.toObject();
}

export async function updateRoom(roomId, roomData) {
  await dbConnect();
  const updated = await Room.findByIdAndUpdate(roomId, roomData, { new: true }).lean();
  return updated;
}

export async function deleteRoom(roomId) {
  await dbConnect();
  await Room.findByIdAndDelete(roomId);
  return { success: true };
}

export async function getBookings() {
  await dbConnect();
  return await Booking.find({}).sort({ createdAt: -1 }).lean();
}

export async function addBooking(bookingData) {
  await dbConnect();
  const created = await Booking.create(bookingData);
  return created.toObject();
}

export async function updateBooking(bookingId, bookingData) {
  await dbConnect();
  const updated = await Booking.findByIdAndUpdate(bookingId, bookingData, { new: true }).lean();
  return updated;
}

export async function getUserByEmail(email) {
  await dbConnect();
  // Auto-seed admin user if no user exists in MongoDB database
  const count = await User.countDocuments({});
  if (count === 0) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync("corporate@123", salt);
    await User.create({
      email: "admin@corporatehouse.com",
      password: hashedPassword,
      role: "admin"
    });
  }
  return await User.findOne({ email }).lean();
}

export async function getQueries() {
  await dbConnect();
  return await UserQuery.find({}).sort({ createdAt: -1 }).lean();
}

export async function addQuery(queryData) {
  await dbConnect();
  const created = await UserQuery.create(queryData);
  return created.toObject();
}
