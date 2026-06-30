"use client";

import { useEffect, useState } from "react";
import { Bell, Search, Plus } from "lucide-react";
import axios from "axios";
interface User {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
}


export default function Header() {
  const [greeting, setGreeting] = useState("");
  const [date, setDate] = useState("");
 const [user, setUser] = useState<User | null>(null);


  useEffect(() => {
  const getUser = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/me",
        {
          withCredentials: true,
        }
      );

      setUser(res.data.user);
    } catch (error) {
      console.error(error);
    }
  };

  getUser();
}, []);

  useEffect(() => {
    const updateHeader = () => {
      const now = new Date();
      const hour = now.getHours();

      if (hour >= 5 && hour < 12) {
        setGreeting("Good morning");
      } else if (hour >= 12 && hour < 17) {
        setGreeting("Good afternoon");
      } else if (hour >= 17 && hour < 21) {
        setGreeting("Good evening");
      } else {
        setGreeting("Good night");
      }

      const formattedDate = now.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      setDate(formattedDate);
    };

    updateHeader();

    const interval = setInterval(updateHeader, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex items-center w-full justify-between border-b border-slate-800 bg-[#0B1220] px-8 py-6 ">
      {/* Left */}
      <div>
        <h1 className="text-3xl font-bold text-white">
        {greeting}, {user?.name || "Alex"} 👋
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          {date}
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4  right-1">
        {/* Search */}
        <div className="flex items-center rounded-xl bg-[#182338] px-4 py-3">
          <Search size={18} className="text-slate-400" />

          <input
            type="text"
            placeholder="Search..."
            className="ml-3 w-64 bg-transparent text-sm text-white placeholder:text-slate-500 outline-none"
          />
        </div>

        {/* Notification */}
        <button className="relative rounded-xl bg-[#182338] p-3 transition hover:bg-[#22314E]">
          <Bell size={20} className="text-white" />

          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
            3
          </span>
        </button>

        {/* Add Transaction */}
        <button className="flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-medium text-white transition hover:bg-emerald-600">
          <Plus size={18} />
          Add Transaction
        </button>
      </div>
    </header>
  );
}