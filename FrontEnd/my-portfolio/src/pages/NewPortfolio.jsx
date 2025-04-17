import { useAuth } from "../context/AuthContext";
import { newPortfolio } from "../services/newPortfolio";
import { useNavigate } from 'react-router-dom';
import "../styles/NewPortfolio.css";



export function NewPortfolio() {

    const { userId } = useAuth();
    const navigate = useNavigate();
    console.log("ID del usuario:", userId);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const nombre = data.get('nombre');
        console.log("Nombre del portfolio:", nombre);
        console.log("ID del usuario:", userId);


        if (nombre === "") {
            alert("Por favor, completa todos los campos.");
        } else {

            const success = await newPortfolio(nombre, userId);

            if (success) {
                console.log('New Portfolio exitoso: ');
                navigate(`/`);
            } else {
                console.log('Error al registrar nuevo portfolio');
            }
        }

    }


    return (
        <div className="new-portfolio-page">
            <div className="new-portfolio">
                <h1>Crear un nuevo portfolio</h1>
                <form className="new-portfolio-form" onSubmit={handleSubmit}>
                    <label htmlFor="nombre">Nombre del portfolio:</label>
                    <input type="text" id="nombre" name="nombre" required
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
                    <button >
                        <span className="dashboard-button_top">Crear Portfolio</span>
                    </button>
                </form>
            </div>
        </div>

    );
}