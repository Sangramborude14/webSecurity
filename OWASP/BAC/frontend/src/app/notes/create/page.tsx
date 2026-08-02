'use client'

import { FormEvent, useState } from "react";

export default function CreateNote(){
const [title,setTitle] = useState('');
const [content,setContent] = useState('');
const [message,setMessage] = useState('');

const onSubmit = async(e: FormEvent) => {
    try {
        const response = await fetch("http://localhost:5000/notes/create",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: 'include',
            body: JSON.stringify({title,content}),
        });

        const data = await response.json();
        if(!response.ok){
            setMessage(data.message);
            throw new Error('unable to post to server');
        }
    }catch(error:any){
        setMessage(error.message);
    }
}

return(<>
<h1 className="text-5xl p-5 m-5">Create Note</h1>
<div className="border border-light-50 flex-cols pl-10 p-20 text-xl space-y-6">
    <div className="gap-5 flex space-x-6 ">

   Title:  <input value={title} type="text" onChange={(e) => setTitle(e.target.value)} required/>
</div>
<div className="gap-5 flex space-x-6">
Content: <textarea value={content}  onChange={(e) => setContent(e.target.value)} required className="w-150 h-100 border border-red-300"/>
</div>
<div className="gap-5 flex space-x-6 w-26  border  border-light-100 hover:bg-white hover:scale-110 hover:text-black transition-all ">
    <button onClick={onSubmit} className="text-center pl-3">CREATE</button>
    {message && <p className="text-light-200">{message}</p>}
</div>

</div>
</>)

}