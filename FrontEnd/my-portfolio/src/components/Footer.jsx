import React from 'react';
import '../styles/Footer.css';

export const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="footer-content">
                <p>Plataforma creada con dedicación por Miguel Bravo Campos</p>
                <p>&copy; {new Date().getFullYear()} Todos los derechos reservados</p>
                <p className="footer-mood">✨Hecho para un Trabajo Final de Grado ✨</p>
            </div>
        </footer>
    );
};

export default Footer;
