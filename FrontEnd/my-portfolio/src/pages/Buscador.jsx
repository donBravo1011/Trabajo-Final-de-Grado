import { useState } from "react";
import { buscarActivoPorCategoria } from "../services/buscar";
import "../styles/Buscador.css";

export function Buscador() {
    const [resultado, setResultado] = useState(null);
    const [assetId, setAssetId] = useState(null);

    const handelSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const categoria = data.get('categoria');
        const activo = data.get('activo');
        setAssetId(activo.toUpperCase());

        const respuesta = await buscarActivoPorCategoria(activo, categoria);

        if (respuesta) {
            setResultado(respuesta);
        } else {
            setResultado(null);
            console.error("No se encontraron datos para el activo y categoría especificados.");
        }
    };

    return (
        <div className="buscador">
            <div className="buscador-container2">
                <h2>Buscador de Activos</h2>
                <form onSubmit={handelSubmit}>
                    <div className="input-group2">
                        <input type="text" name="activo" placeholder="Buscar activos..." required />
                        <select name="categoria" className="categoria-select2">
                            <option value="stock">Stock</option>
                            <option value="crypto">Crypto</option>
                            <option value="etf">ETF</option>
                        </select>
                    </div>
                    <div className="boton2">
                        <button className="dashboard-button_top">
                            <span>Buscar</span>
                        </button>
                    </div>
                </form>
            </div>

            {resultado && (
                <div className="resultado-busqueda animate-entrada">
                    <h3>Resultado:</h3>
                    <strong>El precio de {assetId} es {resultado}</strong>
                </div>
            )}
        </div>
    );
}
