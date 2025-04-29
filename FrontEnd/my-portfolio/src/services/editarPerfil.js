export async function editPerfil(nombre, userId) {
    try {
        const response = await fetch(`http://localhost:8080/sistema/api/v1/user/updateName/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: nombre,
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
        console.error('Error al modificar el nombre del usuario:', error);
        return false;
    }
}