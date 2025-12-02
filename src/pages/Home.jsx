import React from "react";
import { Link } from "react-router-dom";


export default function Home() {
return (
<div className="max-w-4xl mx-auto p-6 text-center">
<h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to QuizApp</h1>
<p className="text-gray-600 mb-6">Small, fast quiz app connected to your Spring Boot backend.</p>
<div className="space-x-3">
<Link to="/login" className="px-4 py-2 bg-indigo-600 text-white rounded">Login</Link>
<Link to="/signup" className="px-4 py-2 border rounded">Register</Link>
</div>
</div>
);
}