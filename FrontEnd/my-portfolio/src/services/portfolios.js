const API = "http://localhost:8080/sistema/api/v1/portfolio/user/1"

export const getPortfolios = async () => {
    try {
        const response = await fetch(API);

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