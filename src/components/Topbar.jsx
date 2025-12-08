// src/components/Topbar.jsx
import React, { useState, useEffect } from "react";
import { Search, SunMoon } from "lucide-react";

export default function Topbar() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="relative">
          <input placeholder="Search..." className="pl-9 pr-3 py-2 rounded border w-80 bg-gray-50 dark:bg-gray-700" />
          <Search className="absolute left-2 top-2 text-gray-400" size={16} />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button onClick={() => setDark(d => !d)} className="p-2 rounded"><SunMoon size={18} /></button>
        <div className="flex items-center gap-2">
          <div className="text-sm">Admin</div>
          <div className="w-8 h-8 bg-blue-600 rounded-full text-white flex items-center justify-center">A</div>
        </div>
      </div>
    </header>
  );
}
