import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_BASE = 'http://localhost:8000/'
import DeleteNoteButton from './components/DeleteNoteButton'
import UpdateNoteForm from './components/UpdateNoteForm'
import NoteTimer from './components/NoteTimer'




export default function App() {
//  <DeleteNoteButton id={n.id} token={token} notes={notes} setNotes={setNotes} /> 


  const [isAuth, setIsAuth] = useState(false)
  const [token, setToken] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [note, setNote] = useState('')
  const [notes, setNotes] = useState([])

  const handleSignup = async () => {
    try {
      await axios.post(`${API_BASE}/signup/`, { username, password })
      alert('Signup successful. You can now login.')
    } catch (err) {
      alert('Signup failed')
    }
  }

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API_BASE}/login/`, { username, password })
      setToken(res.data.access)
      setIsAuth(true)
    } catch (err) {
      alert('Login failed')  
    }
  }

  const createNote = async () => {
    try {
      const res = await axios.post(
        `${API_BASE}/notes_create/`,
        { content: note },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setNotes([...notes, res.data])
      setNote('')
    } catch (err) {
      alert('Could not create note')
    }
  }




//  <DeleteNoteButton id={n.id} token={token} notes={notes} setNotes={setNotes} /> 


  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get(`${API_BASE}/notes/`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setNotes(res.data)
      } catch (err) {
        console.log('Fetching notes failed')
      }
    }

    if (isAuth) fetchNotes()
  }, [isAuth, token])

  return (
    <div className="bg-white shadow-lg p-6 rounded-lg">
      {!isAuth ? (
        <div>
          <h2 className="text-xl font-bold mb-4">Login / Signup</h2>
          <input
            placeholder="Username"
            className="w-full mb-2 p-2 border"
            onChange={e => setUsername(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            className="w-full mb-2 p-2 border"
            onChange={e => setPassword(e.target.value)}
          />
          <div className="flex justify-between">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleLogin}
            >
              Login
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={handleSignup}
            >
              Signup
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold mb-4">Write a Note</h2>
          <h2 className="text-xl font-bold mb-4">It delete after 60 seconds whenever you login again</h2>

          <h3></h3>
          <textarea
            rows="3"
            className="w-full p-2 border mb-2"
            placeholder="Write your note..."
            value={note}
            onChange={e => setNote(e.target.value)}
          ></textarea>
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded w-full"
            onClick={createNote}
          >
            Add Note
          </button>

          <h3 className="text-lg font-semibold mt-6">Your Notes</h3>
         <ul className="mt-2 space-y-2">
          {notes.map(n => (
          <li key={n.id} className="bg-gray-100 p-2 border rounded flex justify-between items-center">
             <div>
        <span>{n.content}</span>
        <NoteTimer createdAt={n.created_at} />
      </div>
      <div className="flex items-center">
        <UpdateNoteForm id={n.id} content={n.content} token={token} notes={notes} setNotes={setNotes} />
        <DeleteNoteButton id={n.id} token={token} notes={notes} setNotes={setNotes} />
      </div>
          
         </li>
          ))}
         </ul>

        </div>
      )}
    </div>
  )
}


