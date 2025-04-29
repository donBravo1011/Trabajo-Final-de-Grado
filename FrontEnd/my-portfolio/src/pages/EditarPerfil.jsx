import { useAuth } from '../context/AuthContext';
import { editPerfil } from '../services/editarPerfil';
import '../styles/EditarPerfil.css';
import { useNavigate } from 'react-router-dom';


export function EditarPerfil() {

    const { userId } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault(); // Evita el envío del formulario por defecto

        const formData = new FormData(event.target);
        const nombre = formData.get('nombre');

        const response = editPerfil(nombre, userId)

        if (response) {
            navigate("/profile")
        }
    }


    return (
        <div className='editar-perfil-page'>
            <div className="editar-perfil">
                <h2 className="titulo-editar-perfil">Editar Perfil</h2>
                <form className="formulario-editar-perfil" onSubmit={handleSubmit}>
                    <label htmlFor="nombre">Nombre:</label>
                    <input type="text" id="nombre" name="nombre" required />

                    <button type="submit" className="boton-guardar-cambios"><span className="dashboard-button_top">Guardar Cambios</span></button>
                </form>
            </div>
        </div>
    );
}