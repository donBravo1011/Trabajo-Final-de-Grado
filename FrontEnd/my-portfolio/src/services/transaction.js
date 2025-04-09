const API = "http://localhost:8080/sistema/api/v1/transaction/4"

export const getTransactionById = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/sistema/api/v1/transaction/${id}`);

        if (!response.ok) {
            throw new Error("Error al obtener la transacion");
        }

        const data = await response.json();
        return data;

    } catch (e) {
        console.error("Error en getTransactionById:", e);
        throw new Error('Error fetching Transaction');
    }
}