import React from "react";
import { Link, useNavigate } from "react-router-dom";


export default function Navbar() {
const navigate = useNavigate();


const logout = () => {
localStorage.removeItem("token");
navigate("/login");
};


return (
<nav className="bg-white shadow-sm">
<div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
<Link to="/" className="text-xl font-semibold text-indigo-600">QuizApp</Link>
<div className="space-x-4">
<Link to="/subjects" className="text-sm text-gray-600 hover:text-indigo-600">Subjects</Link>
<button onClick={logout} className="px-3 py-1 bg-indigo-600 text-white rounded">Logout</button>
</div>
</div>
</nav>
);
}