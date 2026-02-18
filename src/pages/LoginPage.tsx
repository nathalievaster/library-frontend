import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./css/Login.module.css"
import { useAuth } from "../context/AuthContext"

const LoginPage = () => {

  // State för att hålla reda på användarnamn och lösenord
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()
  const { login, user } = useAuth()

  // Kontrollera användare
  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [user, navigate])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("");

    try {
      await login({username, password})
      navigate("/")
    } catch (error) {
      setError("Felaktigt användarnamn eller lösenord")
    }

  }
  return (
    <>
      <h1>Logga in</h1>
      <form className={styles.loginForm} onSubmit={handleLogin}>
        {error && <p className={styles.error}>{error}</p>}
        <input type="text" placeholder="Användarnamn" value={username} onChange={e => setUsername(e.target.value)}/>
        <input type="password" placeholder="Lösenord" value={password} onChange={e => setPassword(e.target.value)}/>
        <button type="submit">Logga in</button>
      </form>
      
    </>
  )
}

export default LoginPage