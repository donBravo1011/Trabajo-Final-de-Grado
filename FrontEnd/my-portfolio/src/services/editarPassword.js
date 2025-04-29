export async function editPassword(password, userId) {
    try {
        const response = await fetch(`http://localhost:8080/sistema/api/v1/user/updatePassword/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: password,
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
        console.error('Error al modificar la password del usuario:', error);
        return false;
    }
}