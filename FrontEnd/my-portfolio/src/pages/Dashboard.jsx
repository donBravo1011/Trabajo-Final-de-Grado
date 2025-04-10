import { useEffect, useState } from "react";
import { getUser } from "../services/user";
import { getPortfolios } from "../services/portfolios";
import "../styles/Dashboard.css";
import { useNavigate } from 'react-router-dom';

import { useAuth } from "../context/AuthContext";


function getTotalPortfolio(transactions) {
    let total = 0;
    transactions.forEach(transaction => {
        if (transaction.tipo === "COMPRA") {
            total += transaction.cantidad * transaction.precio;
        } else if (transaction.tipo === "VENTA") {
            total -= transaction.cantidad * transaction.precio;
        }
    });
    return total;
}

export function Dashboard() {
    const [user, setUser] = useState(null);
    const [portfolios, setPortfolios] = useState([]);
    const [ocultar, setOcultar] = useState(false);
    const navigate = useNavigate();
    const { userEmail } = useAuth();

    useEffect(() => {
        if (userEmail) {
            getUser({ email: userEmail })
                .then(data => {
                    setUser(data);

                })
                .catch(error => {
                    console.error("Error al cargar el usuario:", error);
                });


            getPortfolios({ email: userEmail })
                .then(data => {
                    setPortfolios(data);

                })
                .catch(error => {
                    console.error("Error al cargar los portfolios:", error);
                });
        }
    }, [userEmail]);

    const handleOcultar = () => {
        setOcultar(!ocultar);
    }

    const handlePortfolioClick = (id) => {
        navigate(`/portfolio/${id}`);
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                {user ? (
                    <h1>Hola, {user.nombre}</h1>
                ) : (
                    <p>Cargando usuario...</p>
                )}
                <div className="dashboard-ocultar-totales">
                    <label className="dashboard-label">
                        <h3>Ocultar Totales</h3>
                        <div className="dashboard-toggle">
                            <input className="dashboard-toggle-state" type="checkbox" name="check" value="check" onClick={handleOcultar} />
                            <div className="dashboard-indicator"></div>
                        </div>
                    </label>
                </div>
            </header>

            <main className="dashboard-main">
                <h2>Mis Portafolios</h2>
                <div className="dashboard-portfolios-container">
                    <div className="dashboard-portfolios-list">
                        {portfolios.length > 0 ? (
                            <div className="dashboard-portfolios-grid">
                                {portfolios.map(portfolio => (
                                    <div className="dashboard-portfolio-card" key={portfolio.id} onClick={() => handlePortfolioClick(portfolio.id)}>
                                        <h3>{portfolio.nombre}</h3>
                                        <strong>Total: {ocultar ? "*****" : getTotalPortfolio(portfolio.transactions)} $</strong>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No hay portfolios disponibles.</p>
                        )}
                    </div>
                    <aside className="dashboard-sidebar">
                        <h2>¿Qué quieres hacer?</h2>
                        <div className="dashboard-sidebar-buttons">
                            <button>
                                <span className="dashboard-button_top"> Buscar nuevos activos </span>
                            </button>
                            <button>
                                <span className="dashboard-button_top"> Comprar activos </span>
                            </button>
                            <button>
                                <span className="dashboard-button_top"> Vender tus activos </span>
                            </button>
                            <button>
                                <span className="dashboard-button_top"> Traspasar activos </span>
                            </button>
                        </div>
                    </aside>
                </div>
            </main>
        </div>

    );
}
