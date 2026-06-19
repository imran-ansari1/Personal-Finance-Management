"use client";
import { useState } from 'react';
import { useRouter } from "next/navigation";
import axios from "axios";



const SignupPage = () => {

 
const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: ""
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
     const res = await axios.post(
  `${process.env.NEXT_PUBLIC_API_URL}/register`,
  formData
);

      const data = res.data;
      console.log(res.status);
      console.log(res.data);

      if (res.status === 201) {
        alert("Signup successful ✅");
        router.push("/");
      } else {
        alert(data.message);
      }

    } catch (error) {
      alert("Something went wrong ❌");
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-300 text-gray-500'>
      <h1 className='text-2xl font-bold mb-4'>Sign Up</h1>

      <form onSubmit={handleSubmit} className='bg-white p-6 rounded shadow-md w-full max-w-sm'>

        <input type='text' placeholder='Name'
          className='mb-3 w-full border p-2'
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <input type='tel' placeholder='Phone'
          className='mb-3 w-full border p-2'
          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
        />

        <input type='email' placeholder='Email'
          className='mb-3 w-full border p-2'
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <input type='password' placeholder='Password'
          className='mb-3 w-full border p-2'
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />

        <button className='w-full bg-blue-500 text-white p-2 rounded'>
          Sign Up
        </button>
         <p className="text-sm mt-3 text-center">
          Don't have an account?{" "}
          <span 
            className="text-blue-600 cursor-pointer"
            onClick={() => router.push("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;