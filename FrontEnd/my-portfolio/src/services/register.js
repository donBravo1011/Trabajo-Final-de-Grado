
export async function register(email, password, nombre) {
    try {
        const response = await fetch(`http://localhost:8080/sistema/api/v1/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, nombre }),
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
