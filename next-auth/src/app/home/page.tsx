"use client";
import axios from "axios";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import toast from "react-hot-toast";

const HomePage = () => {
  const [loading, setLoading] = React.useState(true);
  const [userData, setUserData] = React.useState({
    username: "",
    email: "",
    isVerified: false,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/users/me");
        console.log("Fetching user data from /api/users/me", response);
        if (!response.data.success) {
          throw new Error("Failed to fetch user data");
        }
        setUserData(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await axios.get("/api/users/logout");
      if (res.data.success) {
        window.location.href = "/login";
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.log("Error during logout:", error);
      toast.error("Logout Failed");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 p-4 md:p-6"
    >
      <motion.h1
        variants={itemVariants}
        className="text-4xl md:text-5xl font-bold mb-8 text-indigo-700 tracking-tight text-center"
      >
        Welcome to Your Dashboard
      </motion.h1>

      {loading ? (
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center bg-white bg-opacity-90 rounded-xl shadow-lg p-8"
        >
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-xl text-gray-700">Loading your profile...</p>
        </motion.div>
      ) : (
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl shadow-xl p-6 md:p-8 max-w-md w-full"
        >
          <div className="flex items-center justify-between border-b pb-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-800">User Dashboard</h2>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                userData.isVerified
                  ? "bg-green-100 text-green-800"
                  : "bg-amber-100 text-amber-800"
              }`}
            >
              {userData.isVerified ? "Verified" : "Unverified"}
            </span>
          </div>

          <div className="space-y-6">
            <motion.div
              variants={itemVariants}
              className="bg-indigo-50 rounded-lg p-4"
            >
              <div className="flex items-center">
                <div className="bg-indigo-100 rounded-full p-3 mr-4">
                  <svg
                    className="w-6 h-6 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-indigo-600 font-medium">
                    Username
                  </p>
                  <p className="text-lg text-black font-semibold">
                    {userData.username || "Not set"}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-blue-50 rounded-lg p-4"
            >
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-full p-3 mr-4">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-blue-600 font-medium">Email</p>
                  <p className="text-lg text-black font-semibold break-all">
                    {userData.email}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className={`${
                userData.isVerified ? "bg-green-50" : "bg-amber-50"
              } rounded-lg p-4`}
            >
              <div className="flex items-center">
                <div
                  className={`${
                    userData.isVerified ? "bg-green-100" : "bg-amber-100"
                  } rounded-full p-3 mr-4`}
                >
                  <svg
                    className={`w-6 h-6 ${
                      userData.isVerified ? "text-green-600" : "text-amber-600"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={
                        userData.isVerified
                          ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          : "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      }
                    />
                  </svg>
                </div>
                <div>
                  <p
                    className={`text-sm ${
                      userData.isVerified ? "text-green-600" : "text-amber-600"
                    } font-medium`}
                  >
                    Verification Status
                  </p>
                  <p
                    className={`text-lg font-semibold ${
                      userData.isVerified ? "text-green-700" : "text-amber-700"
                    }`}
                  >
                    {userData.isVerified
                      ? "Email Verified"
                      : "Email Not Verified"}
                  </p>
                </div>
              </div>

              {!userData.isVerified && (
                <div className="mt-4 text-center">
                  <Link
                    href="/verifyemail"
                    className="inline-block px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors font-medium"
                  >
                    Verify Your Email
                  </Link>
                </div>
              )}
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="mt-8 pt-6 border-t flex justify-center"
          >
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors font-medium"
            >
              Logout
            </button>
            {!userData.username && (
              <Link
                href="/"
                className="ml-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium"
              >
                Login
              </Link>
            )}
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default HomePage;
