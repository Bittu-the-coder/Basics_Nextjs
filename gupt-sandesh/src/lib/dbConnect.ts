import mongoose from "mongoose";

interface Connection {
  isConnected?: number;
}

const connection: Connection = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    return Promise.resolve();
  }

  try {
    const db = await mongoose.connect(
      (process.env.MONGODB_URI as string) || ""
    );
    connection.isConnected = db.connections[0].readyState;
    console.log("=========", db);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    throw new Error("Failed to connect to the database");
  }
}

export default dbConnect;
