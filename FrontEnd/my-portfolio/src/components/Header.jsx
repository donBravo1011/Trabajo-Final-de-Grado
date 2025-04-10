import "../styles/Header.css";
import { Link } from "react-router-dom";
import perfilIcono from "../assets/icono_perfil.png";
import { useAuth } from "../context/AuthContext.jsx";

export function Header() {

    const { isAuthenticated, logout } = useAuth();

    return (
        <header className="header">
            {isAuthenticated ? (
                <Link to="/" className="logo">
                    <h1>MyPortfolio</h1>
                </Link>
            ) : (
                <div className="logo">
                    <h1>MyPortfolio</h1>
                </div>
            )}
            <div className="profile-icon">
                {isAuthenticated ? (

                    <div className="login-register">
                        <Link to="/profile">
                            <img src={perfilIcono} alt="Icono de perfil" />
                        </Link>
                        <label onClick={logout} style={{ cursor: 'pointer' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"
                                strokeLinecap="round" strokeLinejoin="round" className="feather feather-log-out">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                <polyline points="16 17 21 12 16 7" />
                                <line x1="21" y1="12" x2="9" y2="12" />
                            </svg>
                        </label>
                    </div>
                ) : (
                    <div className="no-login-register">
                        <Link to="/register">
                            <strong>Register</strong>
                        </Link>
                        <strong> | </strong>
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