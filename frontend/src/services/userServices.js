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