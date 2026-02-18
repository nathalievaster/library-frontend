import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import type { Book } from "../types/book.types"


const BookDetails = () => {
  const { id } = useParams()
  const [book, setBook] = useState<Book | null>(null)

  useEffect(() => {
    const fetchBook = async () => {
      const res = await fetch(`http://localhost:5000/api/books/${id}`)
      const data = await res.json()
      setBook(data)
    }

    fetchBook()
  }, [id])

  if (!book) return <p>Laddar...</p>

  return (
    <section style={{ padding: "1em", maxWidth: "800px", margin: "1em auto" }} >
      <h1>{book.title}</h1>
      <p><strong>Författare:</strong> {book.author}</p>
      {book.description && <p><strong>Beskrivning:</strong> {book.description}</p>}
      {book.publishedYear && <p><strong>Utgivningsår:</strong> {book.publishedYear}</p>}
    </section>
  )
}

export default BookDetails
