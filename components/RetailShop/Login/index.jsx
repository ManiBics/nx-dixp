import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col lg:flex-row bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-4xl">
        <div
          className="hidden lg:flex lg:w-1/2 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://img.freepik.com/free-photo/arrangement-black-friday-shopping-carts-with-copy-space_23-2148667047.jpg)`,
          }}
        >
          <div className="flex flex-col items-center justify-center bg-blue-900 bg-opacity-50 h-full w-full text-white p-8">
            <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
            <p className="text-lg">Please login to your account</p>
          </div>
        </div>
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
            Sign In
          </h2>
          <form>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>
            <div className="flex items-center justify-between">
              <Button variant="contained">Sign In</Button>
              <Link
                className="inline-block align-baseline font-bold text-sm text-[#1976d2] hover:underline"
                href="#"
              >
                Forgot Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
