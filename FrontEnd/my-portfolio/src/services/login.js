
export async function loginUser(email, password) {
    try {
        const response = await fetch(`http://localhost:8080/sistema/api/v1/user/login?email=${email}&password=${password}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        const result = await response.json();

        // Se espera que devuelva true o false
        return result;
    } catch (error) {
        console.error('Error al intentar iniciar sesión:', error);
        return false; // En caso de error, asumimos login fallido
    }
}
