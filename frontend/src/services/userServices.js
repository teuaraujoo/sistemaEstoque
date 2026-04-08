import axios from "axios";

const API_URL = 'http://localhost:8800/api/v1/usuario/login';

export async function login(user) {
    const response = await axios.post(API_URL, user);
    const data = await response.data;

    return data;
};