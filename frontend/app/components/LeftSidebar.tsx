"use client";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface User {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
}


import {
  LayoutDashboard,
  ReceiptText,
  Wallet,
  Target,
  TrendingUp,
  Bell,
  Settings,
} from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";


const menuItems = [
  {
    name: "Overview",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    name: "Transactions",
    icon: ReceiptText,
    href: "/dashboard/transactions",
  },
  {
    name: "Budgets",
    icon: Wallet,
    href: "/budgets",
  },
  {
    name: "Goals",
    icon: Target,
    href: "/goals",
    
  },
  {
    name: "Investments",
    icon: TrendingUp,
    href: "/investments",
  },
];


export default function LeftSidebar() 

{
  const [user, setUser] = useState<User | null>(null);
  
const pathname = usePathname();
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
  
  

  return (
    
    <aside className="flex h-screen w-64 flex-col justify-between border-r border-red-500 bg-[#0B1220] px-5 py-6 top-10">
      {/* Logo */}
      <div>
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white font-bold">
            F
          </div>

          <h2 className="text-xl font-bold text-white">
            Fintrack
          </h2>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition
                  ${
            isActive
              ? "bg-emerald-500/20 text-emerald-400"
              : "text-slate-400 hover:bg-slate-800 hover:text-white"
          }`}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom */}
      <div className="space-y-5">
        <div className="space-y-2">
          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white">
            <Bell size={20} />
            Alerts
          </button>

          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white">
            <Settings size={20} />
            Settings
          </button>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 rounded-2xl bg-slate-800 p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-lg font-bold text-white">
            A
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">
              {user?.name }
            </h3>

            <p className="text-xs text-slate-400">
              Premium
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
