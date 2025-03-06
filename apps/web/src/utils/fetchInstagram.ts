export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export async function fetchInstagramData(username: string) {
  if (!username) return null;

  try {
    const res = await fetch(`${API_URL}/instagram/search/${username}`);
    return await res.json();
  } catch (error) {
    console.error("Instagram API Error:", error);
    return null;
  }
}
