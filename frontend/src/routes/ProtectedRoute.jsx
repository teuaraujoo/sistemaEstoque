import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../services/token/setToken";

// Outlet -> renderiza rotas filhas 
// replace -> substitui a entrada atual no histórico do navegador em vez de adicionar uma nova. Isso significa que o usuário não pode voltar para a página anterior usando o botão "voltar"

function ProtectedRoute() {
    const token = getToken("token");

    if (!token) {
        return <Navigate to="/login" replace />
    };

    return <Outlet />;
};

export default ProtectedRoute;
