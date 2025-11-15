// src/services/AuthService.js

export function signup(userData) {
  return fetch("http://localhost:8082/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  }).then((res) => res.json());
}

export function login(credentials) {
  return fetch("http://localhost:8082/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem("user", JSON.stringify(data));
      }
      return data;
    });
}

// ✅ Only keep ONE getCurrentUser() function
export function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch (err) {
    console.error("Error reading user:", err);
    return null;
  }
}

export function logout() {
  localStorage.removeItem("user");
}

export function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  
  if (user && user.token) {
    return { Authorization: "Bearer " + user.token };
  } else {
    return {};
  }
}

