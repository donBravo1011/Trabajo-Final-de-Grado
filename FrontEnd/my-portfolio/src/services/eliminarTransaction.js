export async function eliminarTransaction(id) {
    const url = `http://localhost:8080/sistema/api/v1/transaction/${id}`;

    try {
        const response = await fetch(url, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar transacción: ${response.statusText}`);
        }

        console.log(`Transacción con ID ${id} eliminada con éxito.`);
        return true;
    } catch (error) {
        console.error("Error al eliminar la transacción:", error);
        return false;
    }
}
