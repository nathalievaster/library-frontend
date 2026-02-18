import { useEffect, useState } from "react"
import type { Book } from "../types/book.types"

const AdminPage = () => {
  const [books, setBooks] = useState<Book[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState({
    title: "",
    author: "",
    description: "",
    publishedYear: ""
  })

  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    description: "",
    publishedYear: ""
  })

  const token = localStorage.getItem("token")

  // Hämta böcker
  const fetchBooks = async () => {
    const res = await fetch("http://localhost:5000/api/books")
    const data = await res.json()
    setBooks(data)
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  // Skapa bok
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()

    await fetch("http://localhost:5000/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        ...newBook,
        publishedYear: Number(newBook.publishedYear)
      })
    })

    setNewBook({ title: "", author: "", description: "", publishedYear: "" })
    fetchBooks()
  }

  // Delete
  const handleDelete = async (id: string) => {
    await fetch(`http://localhost:5000/api/books/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    })

    setBooks(prev => prev.filter(b => b._id !== id))
  }

  // Starta edit
  const startEdit = (book: Book) => {
    setEditingId(book._id)
    setEditData({
      title: book.title,
      author: book.author,
      description: book.description || "",
      publishedYear: book.publishedYear?.toString() || ""
    })
  }

  // Spara edit
  const saveEdit = async (id: string) => {
    await fetch(`http://localhost:5000/api/books/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        ...editData,
        publishedYear: Number(editData.publishedYear)
      })
    })

    setEditingId(null)
    fetchBooks()
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <h1>Admin</h1>

      <form onSubmit={handleCreate}>
        <h2>Lägg till bok</h2>

        <input
          placeholder="Titel"
          value={newBook.title}
          onChange={e => setNewBook({ ...newBook, title: e.target.value })}
        />

        <input
          placeholder="Författare"
          value={newBook.author}
          onChange={e => setNewBook({ ...newBook, author: e.target.value })}
        />

        <input
          placeholder="Beskrivning"
          value={newBook.description}
          onChange={e => setNewBook({ ...newBook, description: e.target.value })}
        />

        <input
          placeholder="År"
          value={newBook.publishedYear}
          onChange={e => setNewBook({ ...newBook, publishedYear: e.target.value })}
        />

        <button type="submit">Skapa</button>
      </form>

      <h2>Alla böcker</h2>

      {books.map(book => (
        <div
          key={book._id}
          style={{ border: "1px solid #ccc", padding: "1rem", margin: "1rem" }}
        >
          {editingId === book._id ? (
            <>
              <input
                value={editData.title}
                onChange={e => setEditData({ ...editData, title: e.target.value })}
              />

              <input
                value={editData.author}
                onChange={e => setEditData({ ...editData, author: e.target.value })}
              />

              <input
                value={editData.description}
                onChange={e => setEditData({ ...editData, description: e.target.value })}
              />

              <input
                value={editData.publishedYear}
                onChange={e => setEditData({ ...editData, publishedYear: e.target.value })}
              />

              <button onClick={() => saveEdit(book._id)}>Spara</button>
              <button style={{ backgroundColor: "red" }} onClick={() => setEditingId(null)}>Avbryt</button>
            </>
          ) : (
            <>
              <h3>{book.title}</h3>
              <p>{book.author}</p>

              <button onClick={() => startEdit(book)}>Redigera</button>
              <button style={{ backgroundColor: "red" }} onClick={() => handleDelete(book._id)}>Ta bort</button>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default AdminPage
