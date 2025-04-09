import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Crear el contexto de autenticación
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userEmail, setUserEmail] = useState(null); // Aquí guardamos el email del usuario
    const navigate = useNavigate();

    // Método para iniciar sesión
    const login = (email) => {
        setIsAuthenticated(true);
        setUserEmail(email); // Guardamos el email del usuario
        console.log("hola", userEmail)
        // Puedes guardar en localStorage si deseas persistencia entre sesiones
        localStorage.setItem('userEmail', email);
    };

    // Método para cerrar sesión
    const logout = () => {
        setIsAuthenticated(false);
        setUserEmail(null);
        localStorage.removeItem('userEmail'); // Limpiamos el email de localStorage
        navigate('/login'); // Redirigimos al login
    };

    // Efecto para verificar si el usuario está autenticado cuando recarga la página
    useEffect(() => {
        const savedEmail = localStorage.getItem('userEmail');
        if (savedEmail) {
            setIsAuthenticated(true);
            setUserEmail(savedEmail);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, userEmail, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para usar el contexto en los componentes
export const useAuth = () => {
    return useContext(AuthContext);
};
