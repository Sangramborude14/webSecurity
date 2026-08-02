'use client'

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Note {
  id: string;
  title: string;
  content: string;
}

export default function NoteDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [note, setNote] = useState<Note | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const getNote = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/notes/${id}`, {
          credentials: 'include',
        });
        const resData = await response.json();

        if (response.ok) {
          setNote(resData.data || resData);
        } else {
          setMessage(resData.message || 'Failed to fetch note');
        }
      } catch (err: any) {
        setMessage(err.message || 'An error occurred while fetching the note');
      } finally {
        setLoading(false);
      }
    };

    getNote();
  }, [id]);

  return (
    <div className="p-10 max-w-2xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold border-b pb-4">NOTE DETAILS</h1>

      {message && <p className="text-red-500 font-medium">{message}</p>}

      {loading ? (
        <p className="text-gray-400">Loading note details...</p>
      ) : note ? (
        <div className="border border-gray-300 rounded-lg p-6 space-y-4 shadow-sm">
          <h2 className="text-2xl font-semibold text-white">{note.title}</h2>
          <p className="text-gray-200 whitespace-pre-wrap">{note.content}</p>
          <div className="pt-4 border-t border-gray-700 text-xs text-gray-400">
            Note ID: {note.id}
          </div>
        </div>
      ) : (
        !message && <p className="text-gray-400">No note found for ID: {id}</p>
      )}
    </div>
  );
}