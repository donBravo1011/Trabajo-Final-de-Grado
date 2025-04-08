const API = "http://localhost:8080/sistema/api/v1/portfolio/2"

export const getPortfolioById = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/sistema/api/v1/portfolio/${id}`);

        if (!response.ok) {
            throw new Error("Error al obtener el portfolio");
        }

        const data = await response.json();
        return data;

    } catch (e) {
        console.error("Error en getPortfolioById:", e);
        throw new Error('Error fetching portfolio');
    }
}