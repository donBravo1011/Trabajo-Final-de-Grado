import { useEffect, useState } from "react";
import { getUser } from "../services/user";
import { getPortfolioById } from "../services/single_portfolio.js";
import "../styles/Portfolio.css";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import { eliminarPortfolio } from "../services/elimarPortfolio.js";


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

export function Portfolio() {
    const { id } = useParams();

    const [user, setUser] = useState(null);
    const [portfolio, setPortfolio] = useState([]);
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
        }

        getPortfolioById(id)
            .then(data => {
                setPortfolio(data);
            })
            .catch(error => {
                console.error("Error al cargar los portfolios:", error);
            });
    }, [id, userEmail]);
    //Voy a dejar aqui la idea de poder poner otros porfolios en la misma pagina y que puedas navegar entre ellos

    const handleTransactionClick = (id_transaction, id_portfolio) => {
        navigate(`/transaction/${id_portfolio}/${id_transaction}`);
    };

    const handleEdit = (portfolioId) => {
        navigate(`/editPortfolio/${portfolioId}`);
    }

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm("¿Estás seguro de que deseas eliminar este portfolio?");

        if (isConfirmed) {
            const success = await eliminarPortfolio(id);
            if (success) {
                console.log('Portfolio eliminado exitosamente');
                navigate('/');
            } else {
                console.log('Error al eliminar el portfolio');
            }
        } else {
            console.log('Eliminación cancelada');
        }
    };

    const handelComprarVender = () => {
        navigate(`/comprarVender/${portfolio.id}`);
    }




    return (
        <div className="portfolio-container">
            <header className="portfolio-header">
                {user ? (
                    <h1>Hola, {user.nombre}</h1>
                ) : (
                    <p>Cargando usuario...</p>
                )}
            </header>

            <main className="portfolio-main">

                <div className="portfolio-actions">
                    <h2>{portfolio.nombre}</h2>
                    <div className="icons-container">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="dashboard-icon edit-icon"
                            onClick={() => handleEdit(portfolio.id)}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M16 4l4 4m0 0l-8 8H4v-4l8-8m4 4l4 4"
                            />
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="dashboard-icon delete-icon"
                            onClick={() => handleDelete(portfolio.id)}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </div>
                </div>

                <div className="total-container">

                    <h2>
                        Total: {
                            portfolio && Array.isArray(portfolio.transactions)
                                ? `${getTotalPortfolio(portfolio.transactions)}$`
                                : "Cargando..."
                        }
                    </h2>
                </div>
                <aside className="dashboard-sidebar">
                    <h2>¿Qué quieres hacer?</h2>
                    <div className="dashboard-sidebar-buttons">
                        <button onClick={handelComprarVender} >
                            <span className="dashboard-button_top"> Comprar/Vender activos </span>
                        </button>
                    </div>
                </aside>

                <div className="portfolio-portfolios-container">
                    <div className="portfolio-portfolios-list">
                        {
                            portfolio && Array.isArray(portfolio.transactions) ? (
                                [...portfolio.transactions].reverse().map((transaction, index) => {
                                    const isBuy = transaction.tipo === "COMPRA";
                                    const icon = isBuy ? "🟢" : "🔴";
                                    return (
                                        <div key={index} className="portfolio-card" onClick={() => handleTransactionClick(transaction.id, portfolio.id)}>
                                            <div className="portfolio-card-header">
                                                <h3>{icon} {transaction.assetId}</h3>
                                                <span className={`portfolio-tag ${isBuy ? "buy" : "sell"}`}>
                                                    {transaction.tipo}
                                                </span>
                                            </div>
                                            <div className="portfolio-card-body">
                                                <p><strong>Cantidad:</strong> {transaction.cantidad}</p>
                                                <p><strong>Precio:</strong> ${transaction.precio}</p>
                                                <p><strong>Fecha:</strong> {transaction.fecha}</p>

                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <p>Cargando transacciones...</p>
                            )
                        }
                    </div>
                </div>
            </main>
        </div>

    );
}