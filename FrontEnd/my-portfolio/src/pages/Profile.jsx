import { useEffect, useState } from 'react';
import '../styles/Profile.css';
import { useAuth } from '../context/AuthContext';
import { getUser } from '../services/user';
import { useNavigate } from 'react-router-dom';

export function Profile() {

    const [user, setUser] = useState(null);
    const { userEmail, handleUserId, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (userEmail) {
            getUser({ email: userEmail })
                .then(data => {
                    setUser(data);
                    handleUserId(data.id);
                })
                .catch(error => {
                    console.error("Error al cargar el usuario:", error);
                });
        }
    }, [userEmail, handleUserId]);

    const handelLogOut = () => { logout() }

    const handleEditarPerfil = () => {
        navigate("/editarPerfil");
    }

    const handleCambiarContrasena = () => {
        navigate("/cambiarContrasena");
    }


    return (
        <div className="profile-page">
            {user ? (
                <div className="profile-container">
                    <h2 className="titulo-perfil">Perfil de Usuario</h2>
                    <p><strong>Nombre:</strong> {user.nombre}</p>
                    <p><strong>Correo:</strong> {user.email}</p>

                    <div className="botones-perfil">
                        <button className="boton-editar-perfil" onClick={handleEditarPerfil}><span className="dashboard-button_top">Editar Perfil</span></button>
                        <button className="boton-cambiar-contra" onClick={handleCambiarContrasena}><span className="dashboard-button_top">Cambiar Contraseña</span></button>
                        <button className="boton-log-out" onClick={handelLogOut}><span className="dashboard-button_top">Cerrar Sesión</span></button>
                    </div>
                </div>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );

}