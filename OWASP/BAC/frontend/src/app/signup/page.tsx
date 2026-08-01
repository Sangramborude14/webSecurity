'use client'

import {useState} from 'react';

export default function RegisterPage(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [message,setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/auth/register",{
                method: "POST",
                headers: {'Content-Type': "Application/json"},
                body: JSON.stringify({email,password}),
            })
            const data = await res.json();
            setMessage(data.message);
        }catch(err){
            setMessage('Failed to connect to server');
        }
    }

    return (
        <>
        <div>
            <h1 className='text-center text-red-500 uppercase text-3xl'>Register yourself</h1>
            <form onSubmit={handleSubmit} className='flex-cols ml-5 mt-10 p-5 gap-5'>
               <div className='p-5'>
                 <label>Email: </label>
                <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
               </div>
               <div className='p-5'>
                <label>Password: </label>
                <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
               </div>
               <button type="submit" className='p-2 ml-3 bg-light-500 text-red-500 border border-light-500'>
               SIGNUP</button>
            </form>
            {message && <p>{message}</p>}
        </div>
        </>
    )
}