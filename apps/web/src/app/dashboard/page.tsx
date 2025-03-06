"use client";
import { useState } from "react";
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
import { FaYoutube, FaInstagram } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineAnalytics } from "react-icons/md";

export default function Dashboard() {
  const [handles, setHandles] = useState({
    youtube: "",
    instagram: "",
  });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [channelInfo, setChannelInfo] = useState<{ title: string; thumbnail: string } | null>(null);

  const handleChange = (platform: string, value: string) => {
    setHandles((prev) => ({ ...prev, [platform]: value }));
  };

  const handleAnalyze = async () => {
    if (!handles.youtube.trim() && !handles.instagram.trim()) return;
    
    setLoading(true);
    setData(null);

    try {
      const responses = await Promise.all([
        handles.youtube ? fetch(`${API_URL}/youtube/search/${handles.youtube}`).then((res) => res.json()) : null,
        handles.instagram ? fetch(`${API_URL}/instagram/search/${handles.instagram}`).then((res) => res.json()) : null,
      ]);

      if (responses[0]?.channelId) {
        setChannelInfo({ title: responses[0].title, thumbnail: responses[0].thumbnail });
        
        const youtubeStatsRes = await fetch(`${API_URL}/youtube/channel/${responses[0].channelId}`);
        const youtubeStats = await youtubeStatsRes.json();

        setData({
          youtube: youtubeStats,
          instagram: responses[1] || null,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setLoading(false);
  };

  const totalFollowers =
    (data?.youtube?.subscribers ? parseInt(data.youtube.subscribers) : 0) +
    (data?.instagram?.followers ? parseInt(data.instagram.followers) : 0);

  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold text-primary flex items-center gap-2">
        <MdOutlineAnalytics className="text-accent" /> Digital Presence Analyzer
      </h1>
      <p className="text-lg text-text mt-2">Enter social media handles to analyze engagement.</p>

      {/* Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <PlatformInput
          icon={<FaYoutube className="text-red-500" />}
          label="YouTube Channel Name"
          value={handles.youtube}
          onChange={(e) => handleChange("youtube", e.target.value)}
        />
        <PlatformInput
          icon={<FaInstagram className="text-pink-500" />}
          label="Instagram Username"
          value={handles.instagram}
          onChange={(e) => handleChange("instagram", e.target.value)}
        />
      </div>

      {/* Analyze Button */}
      <button
        onClick={handleAnalyze}
        className="mt-6 bg-primary text-white px-6 py-3 rounded-lg flex items-center gap-2 text-lg"
        disabled={loading}
      >
        <IoSearchOutline className="text-xl" /> {loading ? "Analyzing..." : "Analyze Presence"}
      </button>

      {/* Channel Details */}
      {channelInfo && (
        <div className="mt-6 flex items-center gap-4 bg-background p-4 rounded-lg shadow-lg">
          <img src={channelInfo.thumbnail} alt="Channel Thumbnail" className="w-20 h-20 rounded-full" />
          <h2 className="text-2xl font-bold">{channelInfo.title}</h2>
        </div>
      )}

      {/* Data Display */}
      {data && (
        <div className="mt-8 bg-background p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-primary">Presence Summary</h2>
          <p className="text-lg mt-2 text-text">
            This identity has a total of <span className="font-bold">{totalFollowers.toLocaleString()}</span> followers across platforms.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            {data.youtube && <StatCard title="YouTube Subscribers" value={data.youtube.subscribers} bgColor="bg-primary" />}
            {data.instagram && <StatCard title="Instagram Followers" value={data.instagram.followers} bgColor="bg-secondary" />}
          </div>
        </div>
      )}
    </div>
  );
}

// 🟢 Reusable Platform Input Component
function PlatformInput({ icon, label, value, onChange }: { icon: React.ReactNode; label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div className="flex items-center bg-white rounded-lg shadow-md p-3 w-full">
      {icon}
      <input
        type="text"
        placeholder={label}
        className="flex-grow p-2 text-lg border-none focus:outline-none ml-2"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

// 🟢 Reusable Stat Card Component
function StatCard({ title, value, bgColor }: { title: string; value: string | number; bgColor: string }) {
  return (
    <div className={`shadow-lg p-6 rounded-lg ${bgColor} text-white`}>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
