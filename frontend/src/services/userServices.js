import { api } from "./api";

export async function login(user) {
    const response = await fetch(api.usuario, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(user)
    });
    const data = await response.json();

    return data;
};

export async function logout() {
    const response = await fetch('http://localhost:8800/api/v1/usuario/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        return true;
    } else {
        return false
    };
};