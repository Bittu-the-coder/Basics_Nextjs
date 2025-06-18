"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function VerifyEmailPage() {
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const userId = searchParams.get("userId");

  useEffect(() => {
    // Print the full URL to see what's actually being accessed
    console.log("Current URL:", window.location.href);
    console.log("Search params string:", window.location.search);
    console.log("VerifyEmailPage params:", { token, userId });

    const verifyEmail = async () => {
      try {
        if (!token || !userId) {
          setError("Missing verification information");
          setLoading(false);
          return;
        }

        const response = await axios.post(
          `/api/users/verifyemail?token=${token}&userId=${userId}`
        );
        if (response.data.success) {
          setVerified(true);
        } else {
          setError(response.data.error || "Verification failed");
        }
      } catch (error: any) {
        console.error("Verification error:", error);
        setError(error.response?.data?.error || "Failed to verify email");
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token, userId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-b from-gray-50 to-blue-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 transition-all duration-300 transform hover:shadow-xl">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Verify Your Email
        </h1>

        {loading && (
          <div className="flex flex-col items-center py-8">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-xl text-gray-700">Verifying your email...</p>
          </div>
        )}

        {!loading && verified && (
          <div className="text-center py-6 space-y-6">
            <div className="mx-auto bg-green-100 rounded-full p-3 w-20 h-20 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h2 className="text-2xl text-green-600 font-bold">
              Email Verified Successfully!
            </h2>
            <p className="text-gray-600 mb-4">
              You can now login to your account
            </p>
            <Link
              href="/login"
              className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Login to Your Account
            </Link>
          </div>
        )}

        {!loading && error && (
          <div className="text-center py-6 space-y-6">
            <div className="mx-auto bg-red-100 rounded-full p-3 w-20 h-20 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <h2 className="text-2xl text-red-600 font-bold">
              Invalid verification link
            </h2>
            <p className="mb-4 text-gray-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Retry Verification
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
