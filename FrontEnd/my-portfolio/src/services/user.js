const API_LOGIN = "http://localhost:8080/sistema/api/v1/user/login?email=usuario@example.com&password=miContraseñaSegura123"
const API_GET_USER = "http://localhost:8080/sistema/api/v1/user/1"

export const getUser = async ({ email, password }) => {
    if (email === '' || password === '') return null;

    try {
        const response = await fetch("http://localhost:8080/sistema/api/v1/user/1");

        if (!response.ok) {
            throw new Error("Error al obtener el usuario");
        }

        const data = await response.json();
        return data;

    } catch (e) {
        console.error("Error en getUser:", e);
        throw new Error('Username or password is incorrect');
    }
};
