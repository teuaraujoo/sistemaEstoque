import { limparFormulario, formsPayload, validarFormulario } from "../../utils/moveFormsUtils";
import { toast } from "react-toastify";
import { createMove } from "../../services/moveServices";

export function useMoveForm({ onClose, refreshMoves, ref, tipo }) {
    async function handleSubmit(e) {
        e.preventDefault();
        const form = ref.current;

        if (!form) return;

        if (!validarFormulario(form, tipo)) {
            return toast.warn('Preencha todos os campos!');
        };

        const move = formsPayload(form, tipo);

        try {
            const data = await createMove(move, tipo);

            toast.success(data.message);

            limparFormulario(form);
            onClose();

            await refreshMoves();
        } catch (err) {
            toast.error(err.message);
        };
    };
    return { handleSubmit };
};