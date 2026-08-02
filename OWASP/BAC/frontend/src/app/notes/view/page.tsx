'use client'

import { useEffect, useState } from "react"

interface Note {
  id: string;
  title: string;
  content: string;
}

export default function ViewNote() {
    
const [viewnote, setViewnote] = useState<Note[]>([]);
const [message, setMessage] = useState('');

useEffect(() => {
const getNotes = async() => {
   try {
     const response = await fetch("http://localhost:5000/notes/view", {
       credentials: 'include',
     });
     const notes = await response.json();
     if (Array.isArray(notes)) {
       setViewnote(notes);
     } else if (notes.data && Array.isArray(notes.data)) {
       setViewnote(notes.data);
     }
   } catch(error: any) {
    setMessage(error.message)
   }
}
getNotes();
},[])


return(<>
<h1> VIEW NOTES</h1>
{message && <p>{message}</p>}
<div>
    <div>
        {viewnote.map(note => (
            <div key={note.id} id={note.id}>
                <div>
                    {note.title}
                </div>
                <div>
                <p>{note.content}</p>
                <a  href={`http://localhost:3000/notes/${note.id}`}>View</a>
                </div>
            </div>
        ))}
    </div>
</div>
</>)
}
