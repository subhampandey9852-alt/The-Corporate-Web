import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://subhampandey9852_db_user:Subham%40123@cluster0.4lorj40.mongodb.net/The_Corporate_House?appName=Cluster0";

if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (!MONGODB_URI) {
    return null;
  }

  if (global.mongoose.conn) {
    return global.mongoose.conn;
  }

  if (!global.mongoose.promise) {
    const opts = {
      bufferCommands: false,
    };

    global.mongoose.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    global.mongoose.conn = await global.mongoose.promise;
  } catch (e) {
    global.mongoose.promise = null;
    throw e;
  }

  return global.mongoose.conn;
}

export default dbConnect;
export { MONGODB_URI };
