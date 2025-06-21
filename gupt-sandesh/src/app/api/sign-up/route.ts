import dbConnect from "@/lib/dbConnect";
import User from "@/model/User.model";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
  const { email, username, password } = await request.json();

  if (!email || !username || !password) {
    return new Response(
      JSON.stringify({ success: false, error: "All fields are required" }),
      { status: 400 }
    );
  }

  await dbConnect();
  try {
    const existingUserByUsername = await User.findOne({
      email,
      isVerified: true,
    });
    if (existingUserByUsername) {
      return new Response(
        JSON.stringify({ success: false, error: "Username already exists" }),
        { status: 400 }
      );
    }
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit verification code

    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return new Response(
          JSON.stringify({ success: false, error: "Email already exists" }),
          { status: 400 }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1); // Set expiry to 1 hour from now
        existingUserByEmail.verifyCodeExpiry = expiryDate;
        await existingUserByEmail.save();
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1); // Set expiry to 1 hour from now
      const user = new User({
        name,
        email,
        password: hashedPassword,
        isVerified: false,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isAcceptingMessage: true,
        messages: [],
      });

      await user.save();
    }
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );
    if (!emailResponse) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }
    return new Response(
      JSON.stringify({
        success: true,
        message:
          "User signed up successfully. Please check your email to verify your account.",
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error signing up user:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
