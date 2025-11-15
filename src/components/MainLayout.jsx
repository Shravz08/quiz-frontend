// src/components/MainLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content" style={{ marginLeft: 280, padding: 24 }}>
        {/* Outlet will render the nested route's element */}
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
