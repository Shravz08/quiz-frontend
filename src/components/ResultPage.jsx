import React from "react";


export default function Result(){
const score = localStorage.getItem('score') || 0;
return (
<div className="max-w-2xl mx-auto p-6 text-center">
<h2 className="text-3xl font-bold mb-4">Quiz Result</h2>
<div className="text-6xl font-extrabold text-indigo-600">{score}</div>
<p className="mt-4">Nice work — share or retry the quiz.</p>
</div>
);
}