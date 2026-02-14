import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./Login.module.css"

const LoginPage = () => {

  // State för att hålla reda på användarnamn och lösenord
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    })

    const data = await res.json()

    if (res.ok) {
      // Spara token i localStorage
      localStorage.setItem("token", data.token)
      // Navigera till startsidan
      navigate("/")
    } else {
      alert("Inloggning misslyckades: " + data.message)
    }

  }
    return (
      <>
        <h1>Logga in</h1>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Användarnamn" value={username} onChange={e => setUsername(e.target.value)} required />
          <input type="password" placeholder="Lösenord" value={password} onChange={e => setPassword(e.target.value)} required />
          <button type="submit">Logga in</button>
        </form>
      </>
    )
  }

export default LoginPage