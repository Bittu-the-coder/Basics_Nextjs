"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import React from "react";

const ForgotPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const userId = searchParams.get("userId");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  // console.log("Current URL:", window.location.href);
  // console.log("Search params string:", window.location.search);
  console.log("VerifyEmailPage params:", { token, userId, email });
  const resetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSuccess(false);
    try {
      // Include token and userId as query parameters
      const response = await axios.post(
        `/api/users/reset-password?token=${token}&userId=${userId}`,
        {
          password: password,
        }
      );
      if (response.data.success) {
        setIsSuccess(true);
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        alert(response.data.error || "Failed to reset password");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSuccess(false);
    try {
      const response = await axios.post("/api/users/resetpassword", {
        email: email,
      });
      if (response.data.success) {
        setIsSuccess(true);
        setEmail(""); // Clear the email field on success
      } else {
        alert(response.data.error || "Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-b from-gray-50 to-blue-50 px-4">
      {token && userId ? (
        // Reset password form when token and userId are in the URL
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-black">
            Create New Password
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            Please enter your new password below.
          </p>
          <form onSubmit={resetPassword}>
            <label
              htmlFor="password"
              className="text-black mb-2 block font-medium"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-md p-3 mb-6 w-full text-black"
              minLength={6}
              required
            />{" "}
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-blue-600 hover:bg-blue-700 text-white rounded-md p-3 w-full font-medium transition-colors ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Processing..." : "Reset Password"}
            </button>
            {isSuccess && (
              <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-md text-center">
                Password reset successful! Redirecting to login...
              </div>
            )}
          </form>
        </div>
      ) : (
        // Request password reset email form
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-black">
            Reset Your Password
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>
          <form onSubmit={sendEmail}>
            <label
              htmlFor="email"
              className="text-black mb-2 block font-medium"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-md p-3 mb-6 w-full text-black"
              required
            />{" "}
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-blue-600 hover:bg-blue-700 text-white rounded-md p-3 w-full font-medium transition-colors ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>{" "}
            {isSuccess && (
              <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-md text-center">
                Email sent successfully! Please check your inbox for the reset
                link.
              </div>
            )}
            <div className="mt-6 text-center">
              <Link href="/login" className="text-blue-600 hover:underline">
                Back to login
              </Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
