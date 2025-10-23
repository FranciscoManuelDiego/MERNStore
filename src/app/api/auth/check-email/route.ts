import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb";
import User from "../../../../models/User";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "El email es requerido" },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });

    return NextResponse.json({
      exists: !!existingUser,
      message: existingUser ? "El mail ya está registrado" : "Email disponible"
    });

  } catch (error) {
    console.error("Error checking email:", error);
    return NextResponse.json(
      { message: "Error del servidor" },
      { status: 500 }
    );
  }
}