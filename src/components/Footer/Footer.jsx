import { styles } from "nextjsproject/styles/styleClasses";

export default function Footer() {
    return (
        <footer className={styles.footerSticky}>
            <div className={styles.footerContainer}>
                <h2 className="text-2xl text-black font-bold mb-4">¡Gracias por visitar Matecitos!</h2>
                <p className="text-black mt-0.5">MERN Project by Diego - 2025</p>
            </div>
        </footer>
    );
}
