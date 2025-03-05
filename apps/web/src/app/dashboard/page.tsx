"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export default function Dashboard() {
  const [analytics, setAnalytics] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/auth/login"); // Redirect to login if not authenticated
        return;
      }

      try {
        const res = await fetch(`${API_URL}/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setAnalytics(data);
        } else {
          localStorage.removeItem("token");
          router.push("/auth/login");
        }
      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
    };

    fetchData();
  }, []);

  if (!analytics) return <p className="text-center text-lg">Loading analytics...</p>;

  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold text-primary">Dashboard</h1>
      <p className="text-lg text-text mt-2">Your Engagement Overview</p>

      {/* Engagement Metrics */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="shadow-lg p-6 rounded-lg bg-primary text-white">
          <h2 className="text-lg">Followers</h2>
          <p className="text-3xl font-bold">{analytics.followers}</p>
        </div>

        <div className="shadow-lg p-6 rounded-lg bg-secondary text-white">
          <h2 className="text-lg">Likes</h2>
          <p className="text-3xl font-bold">{analytics.likes}</p>
        </div>

        <div className="shadow-lg p-6 rounded-lg bg-accent text-white">
          <h2 className="text-lg">Views</h2>
          <p className="text-3xl font-bold">{analytics.views}</p>
        </div>
      </div>

      {/* Engagement Rate */}
      <div className="mt-6 shadow-lg p-6 rounded-lg bg-background">
        <h2 className="text-2xl font-bold text-primary">Engagement Rate</h2>
        <p className="text-3xl">{analytics.engagementRate}</p>

        <h3 className="mt-4 text-lg font-bold">Growth</h3>
        <p>Weekly: {analytics.growth.weekly}</p>
        <p>Monthly: {analytics.growth.monthly}</p>
      </div>
    </div>
  );
}
