import React, { useState } from "react";
import api from "../api/axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";


export default function Signup(){
const [form, setForm] = useState({ username:'', password:'' });
const navigate = useNavigate();


const handleSubmit = async (e) =>{
e.preventDefault();
try{
await api.post('/api/auth/register', form);
toast.success('Account created');
setTimeout(()=>navigate('/login'),1000);
}catch(err){
toast.error('Signup failed');
}
};


return (
<div className="min-h-[80vh] flex items-center justify-center">
<div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
<h2 className="text-2xl font-bold mb-4">Create account</h2>
<form onSubmit={handleSubmit} className="space-y-4">
<input value={form.username} onChange={e=>setForm({...form, username:e.target.value})} placeholder="Username" className="w-full p-3 border rounded" />
<input value={form.password} onChange={e=>setForm({...form, password:e.target.value})} placeholder="Password" type="password" className="w-full p-3 border rounded" />
<button type="submit" className="w-full bg-green-600 text-white p-3 rounded">Sign up</button>
</form>
<ToastContainer position="top-right" />
</div>
</div>
);
}