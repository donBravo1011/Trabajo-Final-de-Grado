import '../styles/CambiarContrasena.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { editPassword } from '../services/editarPassword';

export function CambiarContrasena() {

    const { userId } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault(); // Evita el envío del formulario por defecto

        const formData = new FormData(event.target);
        const nueva = formData.get('nueva-contrasena');
        const confirmar = formData.get('confirmar-contrasena');

        if (nueva !== confirmar) {
            alert("Las contraseñas no coinciden. Por favor, inténtelo de nuevo.");
            return;
        }

        const response = editPassword(nueva, userId)

        if (response) {
            alert("Contraseña cambiada con éxito.");
            navigate("/profile")
        }
    }



    return (
        <div className="cambiar-contrasena-page">

            <div className="cambiar-contrasena">
                <h2 className="titulo-cambiar-contrasena">Cambiar Contraseña</h2>
                <form className="formulario-cambiar-contrasena" onSubmit={handleSubmit}>
                    <label htmlFor="nueva-contrasena">Nueva Contraseña:</label>
                    <input type="password" id="nueva-contrasena" name="nueva-contrasena" required />

                    <label htmlFor="confirmar-contrasena">Confirmar Nueva Contraseña:</label>
                    <input type="password" id="confirmar-contrasena" name="confirmar-contrasena" required />

                    <button type="submit" className="boton-guardar-cambios"><span className="dashboard-button_top">Guardar Cambios</span></button>
                </form>
            </div>
        </div>
    );
}