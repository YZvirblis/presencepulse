export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export async function fetchTwitterData(username: string) {
  if (!username) return null;

  try {
    const res = await fetch(`${API_URL}/twitter/user/${username}`);
    return await res.json();
  } catch (error) {
    console.error("Twitter API Error:", error);
    return null;
  }
}
