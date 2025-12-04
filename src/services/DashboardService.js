import { authHeader } from "./AuthService";

export async function fetchDashboardData() {
  const res = await fetch("http://localhost:8082/api/user/dashboard", {
    headers: {
      ...authHeader(),      // adds Authorization: Bearer <token>
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to load dashboard data");
  }

  return res.json();
}
