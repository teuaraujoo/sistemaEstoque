const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authRepositories = require('../repositories/authRepositories');


// exports.create = async (data) => {

//     const senhaHash = await bcrypt.hash(data.senha, 12);

//     const user = authRepositories.create([
//         data.nome,
//         data.email,
//         senhaHash
//     ]);

//     return user;
// };

exports.login = async ({ email, senha }) => {
    const user = await authRepositories.findByEmail(email);

    if (!user) {
        throw new Error('Senha ou email inválidos');
    };

    const senhaCorreta = await bcrypt.compare(senha, user.SENHA_HASH);

    if (!senhaCorreta) {
        throw new Error('Senha ou email inválidos');
    };

    const token = jwt.sign({ id: user.ID, email: user.email }, process.env.JWT_SECRET, { expiresIn: '10h' });

    return {
        token,
        user: {
            id: user.ID,
            email: user.EMAIL,
        }
    };
};