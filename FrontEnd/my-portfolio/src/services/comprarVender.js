export async function comprarVender({ tipo, assetId, cantidad, precio, fecha, portfolioId }) {
    const url = "http://localhost:8080/sistema/api/v1/transaction";

    const body = {
        tipo,
        assetId: assetId.toUpperCase(),
        cantidad: parseFloat(cantidad),
        precio: parseFloat(precio),
        fecha,
        portfolio: {
            id: parseInt(portfolioId)
        }
    };

    try {
        console.log("Enviando body:", body);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const errorText = await response.text(); // Esto da más detalles del backend
            throw new Error(`Error en la transacción: ${errorText}`);
        }

        const data = await response.json();
        console.log("Transacción realizada con éxito:", data);
        return data;
    } catch (error) {
        console.error("Error al realizar la transacción:", error);
        return null;
    }
}
