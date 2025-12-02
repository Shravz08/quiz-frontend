import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";


export default function Quiz(){
const { subject } = useParams();
const [questions, setQuestions] = useState([]);
const [index, setIndex] = useState(0);
const [answers, setAnswers] = useState([]);
const navigate = useNavigate();


useEffect(()=>{
api.get(`/quiz/${subject}`).then(res=> setQuestions(res.data)).catch(err=> console.error(err));
},[subject]);


const choose = (opt) => {
setAnswers(prev=>{ const copy=[...prev]; copy[index]=opt; return copy; });
if(index+1 < questions.length) setIndex(i=>i+1);
else {
// send result
api.post('/submit', { subject, answers }).then(res=>{
localStorage.setItem('score', res.data.score);
navigate('/result');
}).catch(()=>navigate('/result'));
}
};


if(!questions.length) return <div className="p-6">Loading...</div>;


const q = questions[index];


return (
<div className="max-w-3xl mx-auto p-6">
<h2 className="text-xl font-semibold mb-4">{subject} — Question {index+1} / {questions.length}</h2>
<div className="bg-white p-6 rounded shadow">
<p className="mb-4">{q.question}</p>
<div className="space-y-3">
{q.options.map((o,i)=> (
<button key={i} onClick={()=>choose(o)} className="w-full text-left p-3 border rounded hover:bg-gray-50">{o}</button>
))}
</div>
</div>
</div>
);
}