export async function buscarActivoPorCategoria(activo, categoria) {
    if (!activo || !categoria) {
        console.error("Faltan parámetros para la búsqueda.");
        return null;
    }

    const baseUrl = "http://localhost:8080/sistema/api/v1";
    let url = ""

    if (categoria === "crypto") {
        url = `${baseUrl}/crypto/${activo}/EUR`;
    } else {

        url = `${baseUrl}/${categoria}/${activo}`;
    }



    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error al buscar el activo: ${response.statusText}`);
        }

        const data = await response.text(); // 👈 Cambiado a .text()
        console.log("Respuesta recibida:", data);
        return data;

    } catch (error) {
        console.error("Hubo un error al hacer la petición:", error);
        return null;
    }
}
