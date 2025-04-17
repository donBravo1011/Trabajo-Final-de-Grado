import { useAuth } from "../context/AuthContext";
import { editPortfolio } from "../services/editPortfolio";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';




export function EditPortfolio() {

    const { portfolioId } = useParams();
    const { userId } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const nombre = data.get('nombre');

        if (nombre === "") {
            alert("Por favor, completa todos los campos.");
        } else {

            const success = await editPortfolio(nombre, userId, portfolioId);

            if (success) {
                console.log('Edit Portfolio exitoso: ');
                navigate(`/`);
            } else {
                console.log('Error al editar el portfolio');
            }
        }

    }


    return (
        <div className="edit-portfolio-container">
            <h1>Editar Portfolio</h1>
            <form className="edit-portfolio-form" onSubmit={handleSubmit}>
                <label htmlFor="nombre">Nuevo nombre del Portfolio:</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    required
                    maxLength={100} // opción de limitar la longitud total
                    onInput={(e) => {
                        const value = e.target.value;
                        // Verificamos si alguna palabra tiene más de 15 caracteres
                        const tienePalabraLarga = /\b\w{16,}\b/.test(value); // \b es el límite de palabra, \w{21,} busca palabras de más de 20 caracteres

                        if (tienePalabraLarga) {
                            e.target.setCustomValidity("Las palabras no pueden tener más de 15 caracteres.");
                        } else {
                            e.target.setCustomValidity(""); // Reseteamos el mensaje si está bien
                        }
                    }}
                />
                <button type="submit">Guardar Cambios</button>
            </form>

        </div>
    );
}

