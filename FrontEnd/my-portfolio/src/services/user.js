export const getUser = async ({ email }) => {
    if (email === '') return null;

    try {
        const response = await fetch(`http://localhost:8080/sistema/api/v1/user/email/${email}`);

        // Comprobamos si la respuesta es correcta
        if (!response.ok) {
            throw new Error(`Error al obtener el usuario: ${response.statusText}`);
        }

        // Intentamos obtener el cuerpo de la respuesta
        const data = await response.json();

        if (!data) {
            throw new Error('Respuesta vacía de la API');
        }

        return data;

    } catch (e) {
        console.error("Error en getUser:", e);
        // Proporcionamos un mensaje de error más detallado para el cliente
        throw new Error('Error al obtener los datos del usuario');
    }
};
