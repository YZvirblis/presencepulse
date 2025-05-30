"use client";
import { useState } from "react";
import { fetchAllPlatformData } from "@/utils/fetchPlatforms";
import { useAuth } from "@/context/AuthContext";
import { FaYoutube, FaReddit, FaTwitter } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineAnalytics, MdPerson, MdToken, MdTrendingUp } from "react-icons/md";
import StatCard from "@/components/StatCard";
import PlatformInput from "@/components/PlatformInput";
import { AuthModal } from "@/components/AuthModal";

export default function Dashboard() {
  const { user, consumeToken } = useAuth();
  const [handles, setHandles] = useState({
    youtube: "",
    reddit: "",
    twitter: "",
  });
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (platform: string, value: string) => {
    setHandles((prev) => ({ ...prev, [platform]: value }));
  };

  const handleAnalyze = async () => {
    if (!handles.youtube.trim() && !handles.reddit.trim() && !handles.twitter.trim()) return;

    const hasTokens = await consumeToken();
    if (!hasTokens) {
      alert("No tokens left. Please register or subscribe.");
      return;
    }

    setLoading(true);
    setData(null);

    const platformData = await fetchAllPlatformData(handles);
    const newErrors: { [key: string]: string } = {};

    Object.entries(platformData).forEach(([platform, data]) => {
      if (data?.error) newErrors[platform] = data.error;
    });

    setErrors(newErrors);
    setData(platformData);

    setLoading(false);
  };

  const totalFollowers =
    (data?.youtube?.subscribers ?? 0) +
    (data?.reddit?.subscribers ?? 0) +
    (data?.twitter?.followers ?? 0);

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gray-100 py-10">
            {/* Authentication Modal */}
            <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      {/* Header */}
      <div className="w-full max-w-6xl px-6 text-center">
        <h1 className="text-5xl font-extrabold text-primary flex items-center justify-center gap-3">
          <MdOutlineAnalytics className="text-accent text-6xl" /> Digital Presence Analyzer
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Welcome, <span className="font-bold">{user?.name}</span>! You have{" "}
          <span className="font-bold text-primary">{user?.tokens}</span> tokens left.
        </p>
        {/* Guest Notice */}
{user?.name === "Guest" && (
  <div className="mt-4 flex items-center justify-center gap-3 text-yellow-600 bg-yellow-100 border border-yellow-300 px-4 py-3 rounded">
    <span className="font-medium">You&apos;re using a guest account.</span>
    <button
      className="text-primary underline hover:text-indigo-800 transition cursor-pointer"
      onClick={() => setAuthModalOpen(true)}
    >
      Log in or register
    </button>
  </div>
)}

      </div>

      {/* Input Fields */}
      <div className="bg-white shadow-md p-6 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-6xl mt-6">
        <PlatformInput error={errors.youtube} icon={<FaYoutube className="text-red-500" />} label="YouTube Channel" value={handles.youtube} onChange={(e) => handleChange("youtube", e.target.value)} />
        <PlatformInput error={errors.reddit} icon={<FaReddit className="text-orange-500" />} label="Reddit Subreddit" value={handles.reddit} onChange={(e) => handleChange("reddit", e.target.value)} />
        <PlatformInput error={errors.twitter} icon={<FaTwitter className="text-blue-400" />} label="Twitter Username" value={handles.twitter} onChange={(e) => handleChange("twitter", e.target.value)} />
      </div>

      {/* Analyze Button */}
      <div className="text-center mt-6">
        <button
          onClick={handleAnalyze}
          className={`px-8 py-4 rounded-xl flex items-center gap-3 text-xl shadow-lg transition-all ${
            user?.tokens > 0 ? "bg-primary text-white hover:bg-indigo-700" : "bg-gray-400 text-gray-700 "
          }`}
          disabled={user?.tokens <= 0}
        >
          <IoSearchOutline className="text-2xl" /> {loading ? "Analyzing..." : "Analyze Presence"}
        </button>
      </div>

      {/* Out of Tokens Message */}
      {user?.tokens <= 0 && (
        <div className="text-center mt-4 text-red-500 flex items-center justify-center gap-2">
          <MdToken className="text-2xl" /> No tokens left. Please register or subscribe.
        </div>
      )}

      {/* Data Display */}
      {data && (
        <div className="mt-10 bg-white p-8 rounded-lg shadow-lg w-full max-w-6xl">
          <h2 className="text-3xl font-bold text-primary flex items-center gap-2">
            <MdPerson className="text-accent text-4xl" /> Presence Summary
          </h2>
          <p className="text-lg mt-2 text-gray-700">
            This identity has a total of <span className="font-bold text-primary">{totalFollowers.toLocaleString()}</span> followers across platforms.
          </p>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            {data.youtube && !errors.youtube && (
              <>
                <StatCard title="YouTube Subscribers" value={data.youtube.subscribers} icon={<FaYoutube />} bgColor="bg-red-500" />
                <StatCard title="YouTube Avg Views Per Video" value={data.youtube.avgViewsPerVideo} icon={<FaYoutube />} bgColor="bg-red-500" />
                <StatCard title="YouTube Engagement Rate" value={data.youtube.engagementRate} icon={<FaYoutube />} bgColor="bg-red-500" />
              </>
            )}

            {data.reddit && !errors.reddit && (
              <>
                <StatCard title="Reddit Subscribers" value={data.reddit.subscribers} icon={<FaReddit />} bgColor="bg-orange-500" />
                <StatCard title="Reddit Active Users" value={data.reddit.activeUsers} icon={<FaReddit />} bgColor="bg-orange-500" />
                <StatCard title="Reddit Engagement Rate" value={data.reddit.engagementRate} icon={<FaReddit />} bgColor="bg-orange-500" />
              </>
            )}

            {data.twitter && !errors.twitter && (
              <>
                <StatCard title="Twitter Followers" value={data.twitter.followers} icon={<FaTwitter />} bgColor="bg-blue-400" />
                <StatCard title="Twitter Likes" value={data.twitter.totalLikes} icon={<FaTwitter />} bgColor="bg-blue-400" />
                <StatCard title="Twitter Retweets" value={data.twitter.totalRetweets} icon={<FaTwitter />} bgColor="bg-blue-400" />
                <StatCard title="Twitter Engagement Rate" value={data.twitter.engagementRate} icon={<FaTwitter />} bgColor="bg-blue-400" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
