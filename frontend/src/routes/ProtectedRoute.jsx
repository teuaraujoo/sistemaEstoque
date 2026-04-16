import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

// Outlet -> renderiza rotas filhas 
// replace -> substitui a entrada atual no histórico do navegador em vez de adicionar uma nova. Isso significa que o usuário não pode voltar para a página anterior usando o botão "voltar"

function ProtectedRoute() {
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        async function validarUser() {
            try {
                const response = await fetch('http://localhost:8800/api/v1/usuario/user', {
                    method: 'GET',
                    credentials: 'include'
                });
                if (response.ok) {
                    setIsAuth(true);
                } else {
                    setIsAuth(false);
                }
            } catch {
                setIsAuth(false);
            } finally {
                setLoading(false);
            }
        }
        validarUser();
    }, []);

    if (loading) {
        return <p>Caregando...</p>
    };

    return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
