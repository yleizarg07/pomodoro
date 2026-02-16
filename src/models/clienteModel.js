const bcrypt = require('bcryptjs');
const sequelize = require('../config/bd');

async function criar(usuario) {
    const hash = bcrypt.hashSync(usuario.senha, 10);
    return sequelize.query(
        'INSERT INTO clientes (nome, email, senha) VALUES (?, ?, ?)',
        {
            replacements: [usuario.nome, usuario.email, hash],
            type: sequelize.QueryTypes.INSERT,
        }
    );
}

async function buscarPorEmail(email) {
    const [results] = await sequelize.query(
        'SELECT * FROM clientes WHERE email = ?',
        {
            replacements: [email],
            type: sequelize.QueryTypes.SELECT,
        }
    );
    return results[0];
}

async function atualizar(id, dados) {
    const hash = bcrypt.hashSync(dados.senha, 10);
    return sequelize.query(
        'UPDATE clientes SET nome = ?, email = ?, senha = ? WHERE id = ?',
        {
            replacements: [dados.nome, dados.email, hash, id],
            type: sequelize.QueryTypes.UPDATE,
        }
    );
}

async function deletar(id) {
    return sequelize.query(
        'DELETE FROM clientes WHERE id = ?',
        {
            replacements: [id],
            type: sequelize.QueryTypes.DELETE,
        }
    );
}    

async function trocarSenha(id, senha) {
    const hash = bcrypt.hashSync(senha, 10);
    return sequelize.query(
        'UPDATE clientes SET senha = ? WHERE id = ?',
        {
            replacements: [hash, id],
            type: sequelize.QueryTypes.UPDATE,
        }
    );
}

module.exports = {
    criar,
    buscarPorEmail,
    atualizar,
    deletar,
    trocarSenha,
};