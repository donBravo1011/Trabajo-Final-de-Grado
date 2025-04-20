import { buscarActivoPorCategoria } from "../services/buscar";
import { useParams } from 'react-router-dom';
import { comprarVender } from "../services/comprarVender";
import { useNavigate } from 'react-router-dom';
import "../styles/ComprarVender.css";

export function ComprarVender() {

    const { id } = useParams();
    const navigate = useNavigate();


    const handelSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const categoria = data.get('categoria');
        const activo = data.get('activo');
        const cantidad = parseFloat(data.get('cantidad'));

        const tipoRaw = data.get('compra/venta'); // "comprar" o "vender"
        const tipo = tipoRaw.toUpperCase() === "COMPRAR" ? "COMPRA" : "VENTA";


        const fecha = new Date().toISOString().split('T')[0]; // yyyy-mm-dd
        console.log("Fecha:", fecha);

        if (isNaN(cantidad) || cantidad <= 0) {
            alert("Por favor, introduce una cantidad válida.");
            return;
        }



        const precioRaw = await buscarActivoPorCategoria(activo, categoria);
        const precio = parseFloat(precioRaw);

        // Verificamos si es un número válido
        if (!isNaN(precio)) {
            console.log("Precio recibido:", precio);

            const transaccion = await comprarVender({
                tipo,
                assetId: activo,
                cantidad,
                precio,
                fecha,
                portfolioId: id
            });

            if (transaccion) {
                navigate(`/portfolio/${id}`);
            }
        } else {
            alert("No se encontraron datos válidos para el activo y categoría especificados.");
            console.error("Precio inválido recibido:", precioRaw);
        }




    };



    return (
        <div className="comprar-vender-container">
            <div className="buscador-container">
                <h2>Comprar/Vender activos</h2>
                <form action="" onSubmit={handelSubmit}>
                    <div className="input-group">
                        <input type="text" name="activo" placeholder="Comprar/Vender activos..." required />
                        <select name="categoria" className="categoria-select">
                            <option value="stock">Stock</option>
                            <option value="crypto">Crypto</option>
                            <option value="etf">ETF</option>
                        </select>
                    </div>
                    <div>
                        <input type="text" name="cantidad" placeholder="Cantidad" required />
                        <select name="compra/venta" id="compra/venta">
                            <option value="comprar">Comprar</option>
                            <option value="vender">Vender</option>
                        </select>
                    </div>
                    <div className="comprar-vender-button-container">
                        <button className="dashboard-button_top">
                            <span>Comprar/Vender</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
}