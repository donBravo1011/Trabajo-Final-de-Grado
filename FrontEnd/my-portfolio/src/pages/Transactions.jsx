import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { getUser } from "../services/user";
import { getTransactionById } from '../services/transaction';
import { getPortfolioById } from "../services/single_portfolio.js";
import "../styles/Transactions.css";
import { useNavigate } from 'react-router-dom';

export function Transactions() {
    const { id_portfolio, id_transaction } = useParams();
    const [user, setUser] = useState(null);
    const [portfolio, setPortfolio] = useState(null);
    const [transaction, setTransaction] = useState(null);
    const navigate = useNavigate();
    const handleDashboardClick = () => {
        navigate(`/`);
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

        getTransactionById(id_transaction)
            .then(data => {
                setTransaction(data);
                console.log("transaction:", data);
            })
            .catch(error => {
                console.error("Error al cargar la transacción:", error);
            });

        getPortfolioById(id_portfolio)
            .then(data => {
                setPortfolio(data);
                console.log("Portfolio:", data);
            })
            .catch(error => {
                console.error("Error al cargar el portfolio:", error);
            });
    }, [id_transaction, id_portfolio]);

    const getOtherTransactions = () => {
        if (portfolio && portfolio.transactions) {
            const otherTransactions = portfolio.transactions.filter(t => t.id !== transaction.id);
            return otherTransactions.slice(0, 10);
        }
        return [];
    };

    const handleTransactionClick = (id_transaction, id_portfolio) => {
        navigate(`/transaction/${id_portfolio}/${id_transaction}`);
    };

    return (
        <div className="transaction-container">
            <header className="transaction-header">
                {user ? (
                    <h1>Hola, {user.nombre}</h1>
                ) : (
                    <p>Cargando usuario...</p>
                )}
            </header>

            <main className="transaction-main">
                {/* Transacción Seleccionada */}
                {transaction ? (
                    <div className="transaction-card">
                        <div className="card-header">
                            <h3>Transacción: {transaction.tipo}</h3>
                            <span className={`tag ${transaction.tipo === "COMPRA" ? "buy" : "sell"}`}>
                                {transaction.tipo}
                            </span>
                        </div>
                        <div className="card-body">
                            <p><strong>Activo:</strong> {transaction.assetId}</p>
                            <p><strong>Cantidad:</strong> {transaction.cantidad}</p>
                            <p><strong>Precio:</strong> ${transaction.precio}</p>
                            <p><strong>Fecha:</strong> {transaction.fecha}</p>
                        </div>
                        <div className="transaction-footer">
                            <button className="go-back-button" onClick={() => handleDashboardClick()}>Volver a los Portfolios</button>
                        </div>
                    </div>
                ) : (
                    <p>Cargando transacción...</p>
                )}
            </main>
            {/* Otras Transacciones */}
            <div className="other-transactions">
                <h3>Otras transacciones del portfolio:</h3>
                {portfolio && portfolio.transactions && getOtherTransactions().length > 0 ? (
                    <div className="other-transactions-list">
                        {getOtherTransactions().map((transaction) => {
                            const isBuy = transaction.tipo === "COMPRA";
                            const icon = isBuy ? "🟢" : "🔴";

                            return (
                                <div key={transaction.id} className="other-transaction-card" onClick={() => handleTransactionClick(transaction.id, id_portfolio)}>
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
                        })}
                    </div>
                ) : (
                    <p>No hay otras transacciones disponibles.</p>
                )}
            </div>


        </div>
    );
}
