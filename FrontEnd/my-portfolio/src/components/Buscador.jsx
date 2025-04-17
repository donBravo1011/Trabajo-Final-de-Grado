import { buscarActivoPorCategoria } from "../services/buscar";

export function Buscador() {


    const handelSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const categoria = data.get('categoria');
        const activo = data.get('activo');

        if (!activo || !categoria) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        const resultado = await buscarActivoPorCategoria(activo, categoria);

        if (resultado) {
            console.log("Mensaje recibido:", resultado);
            // Puedes mostrarlo en el DOM si quieres, por ejemplo:
            alert(resultado);
        } else {
            console.error("No se encontraron datos para el activo y categoría especificados.");
        }
    };



    return (
        <div className="buscador-container">
            <h2>Buscador de Activos</h2>
            <form action="" onSubmit={handelSubmit}>
                <div className="input-group">
                    <input type="text" name="activo" placeholder="Buscar activos..." />
                    <select name="categoria" className="categoria-select">
                        <option value="stock">Stock</option>
                        <option value="crypto">Crypto</option>
                        <option value="etf">ETF</option>
                    </select>
                </div>
                <button className="dashboard-button_top">
                    <span>Buscar</span>
                </button>
            </form>
        </div>

    );
}