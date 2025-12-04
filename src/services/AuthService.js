// src/services/AuthService.js

const API_URL = "http://localhost:8082/api/auth/";

// SIGNUP
export function signup(userData) {
  return fetch(API_URL + "signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  }).then((res) => res.json());
}

// LOGIN
export function login(credentials) {
  return fetch(API_URL + "login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        // Store only what we need
        localStorage.setItem("token", data.token);

        // Optional store user object safely
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }
      }
      return data;
    });
}

// Get current logged-in user (safe)
export function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch (err) {
    console.error("Error reading user:", err);
    return null;
  }
}

// Get token
export function getToken() {
  return localStorage.getItem("token");
}

// Logout
export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

// Add Authorization header
export function authHeader() {
  const token = localStorage.getItem("token");

  if (token) {
    return { Authorization: "Bearer " + token };
  }

  return {};
}
