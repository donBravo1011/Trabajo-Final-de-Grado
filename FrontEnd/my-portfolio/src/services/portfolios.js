const API = "http://localhost:8080/sistema/api/v1/portfolio/email/usuario@example.com"

export const getPortfolios = async ({ email }) => {
    try {
        const response = await fetch(`http://localhost:8080/sistema/api/v1/portfolio/email/${email}`);

        if (!response.ok) {
            throw new Error("Error al obtener los portfolios");
        }

        const data = await response.json();
        return data;

    } catch (e) {
        console.error("Error en getPortfolios:", e);
        throw new Error('Error fetching portfolios');
    }
}