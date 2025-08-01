import React, { useState } from 'react'
import axios from 'axios'

const API_BASE = 'http://localhost:8000/'

export default function UpdateNoteForm({ id, content, token, notes, setNotes }) {
  const [updatedContent, setUpdatedContent] = useState(content)
  const [isEditing, setIsEditing] = useState(false)

  const updateNote = async () => {
    try {
      const res = await axios.put(
        `${API_BASE}/notes/${id}/`,
        { content: updatedContent },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      const updatedNotes = notes.map(n => (n.id === id ? res.data : n))
      setNotes(updatedNotes)
      setIsEditing(false)
    } catch (err) {
      alert('Could not update note')
    }
  }

  return isEditing ? (
    <div className="flex gap-2 w-full">
      <input
        className="border p-1 flex-1"
        value={updatedContent}
        onChange={e => setUpdatedContent(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-2 rounded"
        onClick={updateNote}
      >
        Save
      </button>
      <button
        className="bg-gray-300 px-2 rounded"
        onClick={() => setIsEditing(false)}
      >
        Cancel
      </button>
    </div>
  ) : (
    <button
      className="bg-yellow-400 text-white px-2 py-1 rounded ml-2"
      onClick={() => setIsEditing(true)}
    >
      Edit
    </button>
  )
}
