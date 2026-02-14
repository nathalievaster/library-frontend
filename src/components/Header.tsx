import { NavLink } from "react-router-dom"
import styles from "./Header.module.css"
import { useAuth } from "../context/AuthContext"

const Header = () => {

  const { user } = useAuth()

  return (
    <header className={styles.header}>
      <ul>
        <li><NavLink to="/">Startsida</NavLink></li>
        <li><NavLink to="/admin">Admin</NavLink></li>
        <li>
          {
            !user ? <NavLink to="/login">Logga in</NavLink> : <button className={styles.logoutButton}>Logga ut</button>
          }
        </li>
      </ul>
    </header>
  )
}

export default Header