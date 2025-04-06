import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Registration from "@/models/Registration";

const MONGODB_URI = process.env.MONGODB_URI || "";

// Mongoose connection setup (inline)
let isConnected = false;

async function connectToDatabase() {
  if (isConnected) return;
  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "registeration", // ✅ replace with actual DB name
    });
    isConnected = true;
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const {
      fullName,
      email,
      phoneNumber,
      countryCode,
      affiliation,
      osPreference,
      selectedAlgorithms,
      solutionCategory,
      userCategory,
    } = body;

    const newRegistration = new Registration({
      fullName,
      email,
      phoneNumber,
      countryCode,
      affiliation,
      osPreference,
      selectedAlgorithms,
      solutionCategory,
      userCategory,
    });

    await newRegistration.save();

    return NextResponse.json(
      { message: "Registration saved successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving registration:", error);
    return NextResponse.json(
      { error: "Failed to save registration." },
      { status: 500 }
    );
  }
}
