import { useEffect, useState } from "react"
import type { Book } from "../types/book.types"
import styles from "./css/Home.module.css"
import { useNavigate } from "react-router-dom"

const HomePage = () => {

  // States för att hantera böcker, laddning och fel
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()

  // useEffect för att hämta böcker när komponenten mountas
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/books")

        if (!res.ok) {
          throw new Error("Kunde inte hämta böcker.")
        }

        const data = await res.json()
        setBooks(data)
      } catch (err) {
        setError("Något gick fel...")
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
    // kör bara en gång när komponenten mountas, därför tom array som dependency
  }, [])

  if (loading) return <p>Laddar...</p>
  if (error) return <p>{error}</p>

  return (

    <>
      <h1>Startsidan</h1>
      <p>Välkommen till min bok-logg! Här delar jag med mig av böcker jag läst.</p>
      <section className={styles["books-section"]}>
        <h2>Böcker jag läst</h2>

        <div className={styles.booksGrid}>
          {books.map(book => (
            <article
              key={book._id}
              className={styles.bookCard}
              onClick={() => navigate(`/books/${book._id}`)}
            >
              <h3>{book.title}</h3>
              <p><strong>Författare:</strong> {book.author}</p>
              {book.description && <p><strong>Beskrivning:</strong> {book.description}</p>} 
              {book.publishedYear && <p><strong>Utgivningsår:</strong> {book.publishedYear}</p>}
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

export default HomePage