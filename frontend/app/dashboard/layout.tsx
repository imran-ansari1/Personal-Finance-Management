"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/me",
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        router.replace("/dashboard/transactions");
      }

      setLoading(false);
    } catch (error) {
      router.replace("/login");
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Checking Authentication...
      </div>
    );
  }

  return <>{children}</>;
}