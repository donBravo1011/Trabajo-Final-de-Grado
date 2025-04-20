export async function modelo(pregunta) {
    try {
        const response = await fetch(`http://localhost:8080/sistema/api/v1/preguntar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ pregunta: pregunta }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error en la respuesta del servidor: ${errorText}`);
        }




        const result = await response.text();
        return result;

    } catch (error) {
        console.error('Error al conectar con el modelo:', error);
        return false;
    }
}
