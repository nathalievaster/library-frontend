import styles from './Footer.module.css'

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <section>
                <h2>Adress</h2>
                <p>Biblioteksgatan 1</p>
                <p>123 45 Staden</p>
            </section>
            <section>
                <h2>Kontakt</h2>
                <p>Telefon: 012-3456789</p>
                <p>Email: xxxx@bibblan.se</p>
            </section>
        </footer>
    )
}

export default Footer