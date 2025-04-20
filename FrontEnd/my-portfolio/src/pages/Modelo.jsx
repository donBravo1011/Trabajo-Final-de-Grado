import { useState } from "react";
import "../styles/Modelo.css";
import { modelo } from "../services/modelo";

export function Modelo() {
    const [resultado, setResultado] = useState(null);

    const handelSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const pregunta = data.get("pregunta");

        const respuesta = await modelo(pregunta);
        if (!respuesta) {
            setResultado("Error al conectar con el modelo");
            return;
        }
        console.log(respuesta)
        setResultado(respuesta)

    };

    return (
        <div className="modelo">
            <div className="modelo-container">
                <h2>Modelo de lenguaje sobre finanzas</h2>
                <form onSubmit={handelSubmit}>
                    <div className="modelo-input-group">
                        <input type="text" name="pregunta" placeholder="Pregunta sobre finanzas..." required />
                    </div>
                    <div className="modelo-boton">
                        <button className="dashboard-button_top">
                            <span>Buscar</span>
                        </button>
                    </div>
                </form>
            </div>

            {resultado && (
                <div className="resultado-modelo">
                    <h3>Resultado:</h3>
                    <strong>{resultado}</strong>
                </div>
            )}
        </div>
    );
}