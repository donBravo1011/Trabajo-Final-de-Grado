import "../styles/Header.css";
import { Link } from "react-router-dom";
import perfilIcono from "../assets/icono_perfil.png";
import { useAuth } from "../context/AuthContext.jsx";

export function Header() {

    const { isAuthenticated, logout } = useAuth();

    return (
        <header className="header">
            <h1>MyPortfolio</h1>
            <div className="profile-icon">
                {isAuthenticated ? (

                    <div>
                        <Link to="/profile">
                            <img src={perfilIcono} alt="Icono de perfil" />
                        </Link>
                        <label onClick={logout}>  Logout</label>
                    </div>
                ) : (
                    <div>
                        <Link to="/register">
                            <strong>Register | </strong>
                        </Link>
                        <Link to="/login">
                            <strong>Login</strong>
                        </Link>
                    </div>
                )
                }

            </div>
        </header>
    );
} 