export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

// ✅ Authenticate user (Login)
export async function authenticateUser(email: string, password: string): Promise<string | null> {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.token;
  } catch (error) {
    console.error("Authentication Error:", error);
    return null;
  }
}

// ✅ Register user (Sign Up)
export async function registerUser(name: string, email: string, password: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    return res.ok;
  } catch (error) {
    console.error("Registration Error:", error);
    return false;
  }
}
export async function checkAuthStatus() {
  const token = localStorage.getItem("token");

  // ✅ If no token, fallback to guest user
  if (!token) {
    console.log("🟡 No token found. Using guest mode.");
    return { name: "Guest", email: "demo", tokens: 5 };
  }

  try {
    const res = await fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      console.warn("🔴 Invalid token. Falling back to guest mode.");
      throw new Error("Invalid token");
    }

    const userData = await res.json();
    console.log("✅ Authenticated as:", userData.name);
    return userData;
  } catch (error) {
    console.error("⚠️ Auth check failed:", error);
    return { name: "Guest", email: "demo", tokens: 5 };
  }
}


export function logoutUser() {
  localStorage.removeItem("token");
}

export async function consumeTokenAPI() {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const res = await fetch(`${API_URL}/dashboard/consume-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      console.error("Token consumption failed:", await res.json());
      return false;
    }

    const data = await res.json();
    return data.tokensLeft; // ✅ Return new token count
  } catch (error) {
    console.error("Error consuming token:", error);
    return false;
  }
}


