import "../styles/Header.css";
import { Link } from "react-router-dom";
import perfilIcono from "../assets/icono_perfil.png";  // 👈 Importamos la imagen

export function Header() {
    return (
        <header className="header">
            <h1>MyPortfolio</h1>
            <div className="profile-icon">
                <Link to="/profile">
                    <img src={perfilIcono} alt="Icono de perfil" />
                </Link>
            </div>
        </header>
    );
} 