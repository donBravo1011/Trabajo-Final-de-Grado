import { useEffect, useState } from "react";
import { getUser } from "../services/user";
import { getPortfolioById } from "../services/single_portfolio.js";
import "../styles/Portfolio.css";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


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
    const currentPrices = {
        AAPL: 160,
        TSL: 360,
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA: 180
    };



    useEffect(() => {
        getUser({ email: "miguel", password: "123456" })
            .then(data => {
                setUser(data);
                console.log(data);
            })
            .catch(error => {
                console.error("Error al cargar el usuario:", error);
            });

        getPortfolioById(id)
            .then(data => {
                setPortfolio(data);
                console.log("Portfolio:", data);
            })
            .catch(error => {
                console.error("Error al cargar los portfolios:", error);
            });
    }, [id]);
    //Voy a dejar aqui la idea de poder poner otros porfolios en la misma pagina y que puedas navegar entre ellos

    const handleTransactionClick = (id_transaction, id_portfolio) => {
        navigate(`/transaction/${id_portfolio}/${id_transaction}`);
    };


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
                <h2>{portfolio.nombre}</h2>
                <div className="total-container">

                    <h2>
                        Total: {
                            portfolio && Array.isArray(portfolio.transactions)
                                ? `${getTotalPortfolio(portfolio.transactions)}$`
                                : "Cargando..."
                        }
                    </h2>
                </div>

                <div className="portfolio-portfolios-container">
                    <div className="portfolio-portfolios-list">
                        {
                            portfolio && Array.isArray(portfolio.transactions) ? (
                                portfolio.transactions.map((transaction, index) => {
                                    const currentPrice = currentPrices[transaction.assetId];
                                    const isBuy = transaction.tipo === "COMPRA";
                                    const diff = currentPrice ? (currentPrice - transaction.precio) * transaction.cantidad : null;
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
                                                {currentPrice && (
                                                    <p className={diff >= 0 ? "portfolio-profit" : "portfolio-loss"}>
                                                        <strong>{diff >= 0 ? "Ganancia estimada:" : "Pérdida estimada:"}</strong> ${diff.toFixed(2)}
                                                    </p>
                                                )}
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