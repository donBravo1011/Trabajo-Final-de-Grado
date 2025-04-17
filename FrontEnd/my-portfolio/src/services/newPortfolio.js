export async function newPortfolio(nombre, userId) {
    try {
        const response = await fetch(`http://localhost:8080/sistema/api/v1/portfolio`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre,
                user: {
                    id: userId
                },
                transactions: []
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error en la respuesta del servidor: ${errorText}`);
        }

        const result = await response.json();

        if (result && result.id) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error al intentar registrarse:', error);
        return false;
    }
}