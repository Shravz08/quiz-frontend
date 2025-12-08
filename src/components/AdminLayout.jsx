import React from "react";
import { Link, Outlet } from "react-router-dom";
import { LayoutGrid, FileCheck, LogOut } from "lucide-react";


export default function AdminLayout() {
return (
<div className="flex min-h-screen bg-gray-100">


{/* Sidebar */}
<aside className="w-64 bg-white shadow-xl p-5 flex flex-col gap-6">
<h1 className="text-2xl font-bold">Admin Panel</h1>


<nav className="flex flex-col gap-3">
<Link to="/admin" className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-200">
<LayoutGrid size={20} /> Dashboard
</Link>


<Link to="/admin/quizzes" className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-200">
<FileCheck size={20} /> Manage Quizzes
</Link>
</nav>


<button className="flex items-center gap-2 p-2 text-red-600 rounded-xl hover:bg-red-100 mt-auto">
<LogOut size={20} /> Logout
</button>
</aside>


{/* Right Side */}
<div className="flex-1">


{/* Top Navbar */}
<header className="bg-white shadow p-4 flex justify-between items-center">
<h2 className="text-xl font-semibold">Admin Dashboard</h2>
<p className="text-sm text-gray-600">Welcome, Admin</p>
</header>


<main className="p-6">
<Outlet />
</main>
</div>
</div>
);
}