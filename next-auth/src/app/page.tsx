"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="py-6">
          <nav className="flex items-center justify-between">
            <div className="font-bold text-2xl text-indigo-700">NextAuth</div>
            <div className="space-x-4">
              <Link
                href="/login"
                className="px-4 py-2 text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-medium"
              >
                Sign Up
              </Link>
            </div>
          </nav>
        </header>

        <main className="py-16">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Secure <span className="text-indigo-600">Authentication</span>{" "}
                For Your Next.js App
              </h1>
              <p className="mt-6 text-lg text-gray-600">
                Our authentication system provides a complete solution with
                email verification, secure login, and user management for your
                Next.js applications.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/signup"
                  className="px-8 py-3 bg-indigo-600 text-white text-center rounded-md hover:bg-indigo-700 transition-colors font-medium"
                >
                  Get Started
                </Link>
                <Link
                  href="/login"
                  className="px-8 py-3 bg-white text-indigo-600 text-center border border-indigo-600 rounded-md hover:bg-indigo-50 transition-colors font-medium"
                >
                  Login
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="flex-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white p-6 rounded-xl shadow-xl">
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <div className="flex space-x-2 mb-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="font-mono text-sm text-gray-700">
                    <p className="text-purple-600">
                      const <span className="text-blue-600">user</span> ={" "}
                      <span className="text-orange-600">await</span>{" "}
                      <span className="text-green-600">authenticate</span>(
                      <span className="text-red-600">'credentials'</span>);
                    </p>
                    <p className="text-gray-400 mt-2">
                      // Secure authentication
                    </p>
                    <p className="text-purple-600 mt-2">
                      <span className="text-blue-600">if</span> (user) {`{`}
                    </p>
                    <p className="text-green-600 ml-4">redirectToHomePage();</p>
                    <p className="text-purple-600">{`}`}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <svg
                      className="h-6 w-6 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="text-gray-700">Email verification</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg
                      className="h-6 w-6 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="text-gray-700">
                      Secure password storage
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg
                      className="h-6 w-6 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="text-gray-700">
                      User profile management
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </main>

        <footer className="py-8 border-t border-gray-200">
          <p className="text-center text-gray-600">
            © 2023 NextAuth. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
