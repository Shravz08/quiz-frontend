import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";


export default function Subjects(){
const [subjects, setSubjects] = useState([]);
const navigate = useNavigate();


useEffect(()=>{
api.get('/subjects')
.then(res=> setSubjects(res.data))
.catch(err=> console.error(err));
},[]);


return (
<div className="max-w-5xl mx-auto p-6">
<h2 className="text-2xl font-semibold mb-4">Subjects</h2>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
{subjects.map((s)=> (
<div key={s} className="p-4 bg-white rounded shadow cursor-pointer hover:shadow-lg" onClick={()=>navigate(`/quiz/${s}`)}>
<h3 className="text-lg font-medium">{s}</h3>
<p className="text-sm text-gray-500">Tap to start quiz</p>
</div>
))}
</div>
</div>
);
}