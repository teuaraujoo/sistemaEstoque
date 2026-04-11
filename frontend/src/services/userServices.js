import axios from "axios";
import { api } from "./api";

export async function login(user) {
    const response = await axios.post(api.usuario, user);
    const data = await response.data;

    return data;
};