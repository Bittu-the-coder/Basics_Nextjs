import { connect } from "@/db/db.config";
import User from "@/models/user.modal";
import bcrypt from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get("token");
    const userId = searchParams.get("userId");
    console.log("Received reset password request:", token, userId);
    if (!token || !userId) {
      return NextResponse.json(
        { error: "Token and userId are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });
    console.log("Searching for user with token:", user);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid token or token expired" },
        { status: 400 }
      );
    }

    const { password } = await request.json();
    const hashPassword = await bcrypt.hash(String(password), 10);

    const updateUser = await User.findByIdAndUpdate(user._id, {
      password: hashPassword,
      forgotPasswordToken: null,
      forgotPasswordTokenExpiry: null,
    });
    console.log("Updated User", updateUser);
    return NextResponse.json({
      message: "Password reset successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error during reset password:", error);
    return NextResponse.json(
      { error: "Failed to reset password" },
      { status: 500 }
    );
  }
}
