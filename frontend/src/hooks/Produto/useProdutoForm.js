import { toast } from 'react-toastify';
import { createProduto, updateProduto } from '../../services/produtosServices';
import {
    limparFormulario,
    formsPayload,
    validarFormulario,
} from '../../utils/produtoFormsUtils';

export function useProdutoForm({ onEdit, setOnEdit, onClose, refreshProdutos, ref }) {
    async function handleSubmit(e) {
        e.preventDefault();
        const form = ref.current;

        if (!form) return;

        if (!validarFormulario(form)) {
            return toast.warn('Preencha todos os campos!');
        };

        const produto = formsPayload(form, onEdit);

        try {
            const data = onEdit ? await updateProduto(produto) : await createProduto(produto);

            toast.success(data.message)

            limparFormulario(form);
            setOnEdit(null);
            onClose();

            await refreshProdutos();
        } catch (err) {
            toast.error(err.response?.data)
        }
    };
    return { handleSubmit };
};