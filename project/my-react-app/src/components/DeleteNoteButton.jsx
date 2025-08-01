import React from 'react'
import axios from 'axios'

const API_BASE = 'http://localhost:8000/'

export default function DeleteNoteButton({ id, token, notes, setNotes }) {
  const deleteNote = async () => {
    try {
      await axios.delete(`${API_BASE}/notes_delete/${id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setNotes(notes.filter(n => n.id !== id))
    } catch (err) {
      alert('Could not delete note')
    }
  }

  return (
    <button
      onClick={deleteNote}
      className="bg-red-500 text-white px-2 py-1 rounded ml-4"
    >
      Delete
    </button>
  )
}
