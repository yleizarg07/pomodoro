const sessaoModel = require('../models/sessaoModel');
const tarefaModel = require('../models/tarefaModel');

async function criarSessao(req, res) {
    try {
        const { cliente_id, tipo, inicio, fim, duracao, data } = req.body;
        await sessaoModel.criarSessao({ cliente_id, tipo, inicio, fim, duracao, data });
        res.status(201).json({ message: 'Sessão criada' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


module.exports = {
    criarSessao
};