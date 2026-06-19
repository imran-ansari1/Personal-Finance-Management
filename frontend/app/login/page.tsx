"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const LoginPage = () => {

  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
         const res = await axios.post(
  `${process.env.NEXT_PUBLIC_API_URL}/login`,
  formData
);

      const data = res.data;

      if (res.status === 201) {
        // 🔐 token store
        localStorage.setItem("token", data.token);

        alert("Login successful ✅");

        // 🔥 redirect
        router.push("/");
      } else {
        alert(data.message);
      }

    } catch (error) {
      alert("Something went wrong ❌");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300 text-gray-700">
      
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="mb-3 w-full border p-2"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="mb-3 w-full border p-2"
          onChange={handleChange}
        />

        <button className="w-full bg-blue-500 text-white p-2 rounded">
          Login
        </button>

        <p className="text-sm mt-3 text-center">
          Don't have an account?{" "}
          <span 
            className="text-blue-600 cursor-pointer"
            onClick={() => router.push("/signup")}
          >
            Signup
          </span>
        </p>

      </form>
    </div>
  );
};

export default LoginPage;