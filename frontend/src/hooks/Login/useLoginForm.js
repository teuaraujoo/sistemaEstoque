import { validarFormulario, formsPayload, limparForms } from "../../utils/loginFormsUtil";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../services/userServices";

export function useLoginForm({ ref }) {
    const navigate = useNavigate();

    async function handleSubmmit(e) {
        e.preventDefault();

        const form = ref.current;

        if (!form) return;

        if (!validarFormulario(form)) {
            return toast.warn('Preencha todos os campos!');
        };

        const user = formsPayload(form);

        try {
            const data = await login(user);

            toast.success(data.message);
            limparForms(form);
            navigate('/');
        } catch (err) {
            toast.error(err.response?.data);
        };
    };

    return handleSubmmit;
};

