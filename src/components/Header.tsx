import { NavLink } from "react-router-dom"
import styles from "./Header.module.css"

const Header = () => {
  return (
    <header className={styles.header}>
        <ul>
            <li><NavLink to="/">Startsida</NavLink></li>
            <li><NavLink to="/login">Logga in</NavLink></li>
            <li><NavLink to="/admin">Admin</NavLink></li>
        </ul>
    </header>
  )
}

export default Header