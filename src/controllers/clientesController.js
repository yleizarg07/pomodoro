const clienteModel = require('../models/clienteModel');
const bcrypt = require('bcryptjs');
const tamanho_minimo_da_senha = 6;
const tamanho_maximo_da_senha = 20;

async function criarUsuario(req, res) {
    try {
        const { nome, email, senha } = req.body;
        if (!senha || senha.length < tamanho_minimo_da_senha) {
            return res.status(400).json({ error: 'Senha muito curta' });
        }
        await clienteModel.criar({ nome, email, senha });
        return res.redirect('/');
    } catch (err) {
        console.error('Erro ao criar cliente:', err.message);
        res.status(500).json({ error: 'Erro ao criar cliente' });
    }
}

async function loginCliente(req, res) {
    try {
        const { email, senha } = req.body;
        const clienteEncontrado = await clienteModel.buscarPorEmail(email);
        if (!clienteEncontrado) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        const senhaValida = bcrypt.compareSync(senha, clienteEncontrado.senha);
        if (!senhaValida) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }
        res.status(200).json({ message: 'Login bem-sucedido' });
    } catch (err) {
        console.error('Erro ao fazer login:', err.message);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
}

async function atualizarCliente(req, res) {
    try {
        const { id } = req.params;
        const { nome, email, senha } = req.body;
        await clienteModel.atualizar(id, { nome, email, senha });
        res.status(200).json({ message: 'Cliente atualizado com sucesso' });
    } catch (err) {
        console.error('Erro ao atualizar cliente:', err.message);
        res.status(500).json({ error: 'Erro ao atualizar cliente' });
    }
}

async function deletarCliente(req, res) {
    try {
        const { id } = req.params;
        await clienteModel.deletar(id);
        res.status(200).json({ message: 'Cliente deletado com sucesso' });
    } catch (err) {
        console.error('Erro ao deletar cliente:', err.message);
        res.status(500).json({ error: 'Erro ao deletar cliente' });
    }
}

async function trocarSenha(req, res) {
    try {
        const { id } = req.params;
        const { senha } = req.body;
        if (!senha || senha.length < tamanho_minimo_da_senha) {
            return res.status(400).json({ error: 'Senha muito curta' });
        }
        await clienteModel.trocarSenha(id, senha);
        res.status(200).json({ message: 'Senha atualizada com sucesso' });
    } catch (err) {
        console.error('Erro ao trocar senha:', err.message);
        res.status(500).json({ error: 'Erro ao trocar senha' });
    }
}

module.exports = {
    criarUsuario,
    loginCliente,
    atualizarCliente,
    deletarCliente,
    trocarSenha,
};