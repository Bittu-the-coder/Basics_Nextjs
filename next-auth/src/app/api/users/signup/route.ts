import { connect } from "@/db/db.config";
import User from "@/models/user.modal";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { sendMail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, username } = body;
    console.log("Received signup request:", body);
    if (!email || !password || !username) {
      return NextResponse.json(
        { error: "Email, password, and username are required" },
        { status: 400 }
      );
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }
    const hashedPassword = await bcrypt.hash(String(password), 10);

    const user = new User({ email, password: hashedPassword, username });
    const savedUser = await user.save();
    console.log("User created successfully:", savedUser);

    // send verification email
    await sendMail({
      email: savedUser.email,
      emailType: "verify",
      userId: savedUser._id.toString(),
    });
    return NextResponse.json({
      message:
        "User created successfully, please check your email for verification",
      success: true,
      savedUser,
    });
  } catch (error) {
    console.error("Error during signup:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
