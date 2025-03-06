"use client";
import { useState } from "react";
import { fetchAllPlatformData } from "@/utils/fetchPlatforms";
import { FaYoutube, FaInstagram, FaReddit, FaTwitter } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineAnalytics } from "react-icons/md";
import StatCard from "@/components/StatCard";
import PlatformInput from "@/components/PlatformInput";

export default function Dashboard() {
  const [handles, setHandles] = useState({
    youtube: "",
    instagram: "",
    reddit: "",
    twitter: "",
  });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const handleChange = (platform: string, value: string) => {
    setHandles((prev) => ({ ...prev, [platform]: value }));
  };

  const handleAnalyze = async () => {
    if (!handles.youtube.trim() && !handles.instagram.trim() && !handles.reddit.trim() && !handles.twitter.trim()) return;

    setLoading(true);
    setData(null);

    const platformData = await fetchAllPlatformData(handles);
    setData(platformData);

    setLoading(false);
  };

  const totalFollowers =
    (data?.youtube?.subscribers ? parseInt(data.youtube.subscribers) : 0) +
    (data?.instagram?.followers ? parseInt(data.instagram.followers) : 0) +
    (data?.reddit?.subscribers ? parseInt(data.reddit.subscribers) : 0) +
    (data?.twitter?.followers ? parseInt(data.twitter.followers) : 0);

  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold text-primary flex items-center gap-2">
        <MdOutlineAnalytics className="text-accent" /> Digital Presence Analyzer
      </h1>
      <p className="text-lg text-text mt-2">Enter social media handles to analyze engagement.</p>

      {/* Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <PlatformInput icon={<FaYoutube className="text-red-500" />} label="YouTube Channel Name" value={handles.youtube} onChange={(e) => handleChange("youtube", e.target.value)} />
        <PlatformInput icon={<FaInstagram className="text-pink-500" />} label="Instagram Username" value={handles.instagram} onChange={(e) => handleChange("instagram", e.target.value)} />
        <PlatformInput icon={<FaReddit className="text-orange-500" />} label="Reddit Subreddit" value={handles.reddit} onChange={(e) => handleChange("reddit", e.target.value)} />
        <PlatformInput icon={<FaTwitter className="text-blue-400" />} label="Twitter Username" value={handles.twitter} onChange={(e) => handleChange("twitter", e.target.value)} />
      </div>

      {/* Analyze Button */}
      <button onClick={handleAnalyze} className="mt-6 bg-primary text-white px-6 py-3 rounded-lg flex items-center gap-2 text-lg" disabled={loading}>
        <IoSearchOutline className="text-xl" /> {loading ? "Analyzing..." : "Analyze Presence"}
      </button>

      {/* Data Display */}
      {data && (
        <div className="mt-8 bg-background p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-primary">Presence Summary</h2>
          <p className="text-lg mt-2 text-text">
            This identity has a total of <span className="font-bold">{totalFollowers.toLocaleString()}</span> followers across platforms.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-4">
            {data.youtube && <StatCard title="YouTube Subscribers" value={data.youtube.subscribers} bgColor="bg-primary" />}
            {data.instagram && <StatCard title="Instagram Followers" value={data.instagram.followers} bgColor="bg-secondary" />}
            {data.reddit && <StatCard title="Reddit Subscribers" value={data.reddit.subscribers} bgColor="bg-orange-500" />}
            {data.twitter && <StatCard title="Twitter Followers" value={data.twitter.followers} bgColor="bg-blue-400" />}
          </div>
        </div>
      )}
    </div>
  );
}