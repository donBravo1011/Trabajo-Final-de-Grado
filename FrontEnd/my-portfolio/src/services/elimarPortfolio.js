export async function eliminarPortfolio(portfolioId) {
    if (!portfolioId) {
        console.error('El id del portfolio no puede ser nulo o vacío');
        return false;
    }

    try {
        const response = await fetch(`http://localhost:8080/sistema/api/v1/portfolio/${portfolioId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error en la respuesta del servidor: ${errorText}`);
        }

        return true;
    } catch (error) {
        console.error('Error al eliminar el portfolio:', error);
        return false;
    }
}
