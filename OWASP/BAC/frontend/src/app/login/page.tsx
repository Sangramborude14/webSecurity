'use client'
import { useState } from "react"

export default function Login(){
const [email,setEmail] = useState('');
const [password,setPassword] = useState('');
const [message,setMessage] = useState('');

const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try{
        const response: any = await fetch('http://localhost:5000/auth/login', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email,password}),
        credentials: "include"
    })
    const data = await response.json();

    if(response.ok){
        const token = response.token;
        setMessage(data.message)

    }else{
        setMessage(data.message || "Login failed")
    }

    }catch(err:any){
        setMessage(err.message);
        
    }
}

return(<>
<h1 className="bg-white text-black text-5xl text-center p-3">LOGIN</h1>
<div className="grid gap-4 m-5 justify-center border border-light-200 px-1 py-6 w-1/3 ">
    <form onSubmit={onSubmit}>
        <div>
            <label>EMAIL: </label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-white text-red-800 px-2 text-center m-5"/>
        </div>
        <div>
            <label>PASSWORD: </label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="bg-white text-red-800 px-2 text-center m-5"/>
        </div>
        <div>
            <button type="submit" className="bg-white text-black border border-red-700 p-1 rounded-sm">LOGIN</button>
        </div>

    </form>
            {message && <p className="text-white">{message}</p>}
</div>
</>)

}