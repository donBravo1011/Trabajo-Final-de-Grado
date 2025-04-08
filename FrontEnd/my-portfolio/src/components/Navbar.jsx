import "../styles/Navbar.css";

import { Link } from "react-router-dom";

export function Navbar() {
    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/portfolio">Portfolios</Link></li>
                <li><Link to="/transactions">Transactions</Link></li>
            </ul>
        </nav>
    );
};


