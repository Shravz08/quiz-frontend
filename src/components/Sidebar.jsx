// src/components/Sidebar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Home, FileText, Layers, Plus } from "lucide-react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <aside className={`flex flex-col p-4 bg-white dark:bg-gray-800 ${collapsed ? "w-20" : "w-64"}`}>
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-600 text-white rounded"><Home size={18} /></div>
        {!collapsed && <h1 className="text-lg font-semibold">Quiz Admin</h1>}
        <button onClick={() => setCollapsed(s => !s)} className="ml-auto"><Menu size={16} /></button>
      </div>

      <nav className="mt-6 flex-1">
        <ul className="flex flex-col gap-1">
          <li><Link to="/admin" className="p-2 rounded hover:bg-gray-100">Dashboard</Link></li>
          <li><Link to="/admin/quizzes" className="p-2 rounded hover:bg-gray-100">Quizzes</Link></li>
          <li><Link to="/admin/questions" className="p-2 rounded hover:bg-gray-100">Questions</Link></li>
          <li><Link to="/admin/options" className="p-2 rounded hover:bg-gray-100">Options</Link></li>
        </ul>
      </nav>

      <div className="mt-auto">
        <button className="w-full p-2 rounded hover:bg-gray-100">Logout</button>
      </div>
    </aside>
  );
}
