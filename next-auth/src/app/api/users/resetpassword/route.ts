import { connect } from "@/db/db.config";
import User from "@/models/user.modal";
import { NextResponse, NextRequest } from "next/server";
import { sendMail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;
    console.log("Received forgot password request for email:", email);

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // send reset password email
    await sendMail({
      email: user.email,
      emailType: "reset",
      userId: user._id.toString(),
    });
    return NextResponse.json(
      { message: "Email sent successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during forgot password:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
