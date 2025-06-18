import User from "@/models/user.modal";
import nodemailer from "nodemailer";
import crypto from "crypto";

interface SendMailParams {
  email: string;
  emailType: "verify" | "reset";
  userId?: string;
}

export const sendMail = async ({
  email,
  emailType,
  userId,
}: SendMailParams) => {
  try {
    // Generate a URL-safe token instead of using bcrypt
    const token = crypto.randomBytes(32).toString("hex");
    console.log("Generated token:", token);

    // Update this condition: Check if userId exists (not "not exists")
    if (emailType === "verify" && userId) {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          verifyToken: token,
          verifyTokenExpiry: new Date(Date.now() + 3600000), // 1 hour
        },
        { new: true }
      );
      console.log("Updated user with verify token:", updatedUser);
    } else if (emailType === "reset" && userId) {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          forgotPasswordToken: token,
          forgotPasswordTokenExpiry: new Date(Date.now() + 3600000), // 1 hour
        },
        { new: true }
      );
      console.log("Updated user with reset token:", updatedUser);
    }

    console.log(
      "User ID for email:",
      userId ? await User.findById(userId) : "No userId provided"
    );

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });
    const mailOptions = {
      from: "bittu@gmail.com",
      to: email,
      subject:
        emailType === "verify" ? "Verify your email" : "Reset your password",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; border-radius: 5px;">
          <h2 style="color: #333;">${
            emailType === "verify" ? "Verify Your Email" : "Reset Your Password"
          }</h2>
          <p style="color: #555;">Click the link below to ${
            emailType === "verify" ? "verify your email" : "reset your password"
          }:</p>
          <a href="${process.env.DOMAIN || "http://localhost:3000"}/${
        emailType === "verify" ? "verifyemail" : "resetpassword"
      }?token=${token}&userId=${userId}&email=${email}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">${
        emailType === "verify" ? "Verify Email" : "Reset Password"
      }</a>
          <p style="color: #555; margin-top: 20px;">If you did not request this, please ignore this email.</p>
        </div>
      `,
    };
    const mailResponse = await transport.sendMail(mailOptions);
    console.log("Email sent successfully:", mailResponse);
    return mailResponse;
  } catch (error: any) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
