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

async function getTempo(req, res) {
    try {
        const { periodo, data } = req.query;
        const cliente_id = req.session.cliente_id || 1; // Assumir 1 por enquanto
        let periodoObj = null;
        const start = new Date(data);
        if (periodo === 'dia') {
            periodoObj = { inicio: data, fim: data };
        } else if (periodo === 'semana') {
            const end = new Date(start);
            end.setDate(start.getDate() + 6);
            periodoObj = { inicio: start.toISOString().split('T')[0], fim: end.toISOString().split('T')[0] };
        } else if (periodo === 'mes') {
            const end = new Date(start.getFullYear(), start.getMonth() + 1, 0);
            periodoObj = { inicio: start.toISOString().split('T')[0], fim: end.toISOString().split('T')[0] };
        } else if (periodo === 'ano') {
            const end = new Date(start.getFullYear(), 11, 31);
            periodoObj = { inicio: start.toISOString().split('T')[0], fim: end.toISOString().split('T')[0] };
        }

        const horas = await sessaoModel.calcularHorasTotais(cliente_id, periodoObj);
        const tarefas = await tarefaModel.contarTarefasConcluidas(cliente_id, periodoObj);
        res.json({ horas, tarefas });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function criarTarefa(req, res) {
    try {
        const { descricao } = req.body;
        const cliente_id = req.session.cliente_id;
        await tarefaModel.criarTarefa({ cliente_id, descricao });
        res.status(201).json({ message: 'Tarefa criada' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getTarefas(req, res) {
    try {
        const cliente_id = req.session.cliente_id;
        const tarefas = await tarefaModel.buscarTarefasPorCliente(cliente_id);
        res.json(tarefas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function atualizarTarefa(req, res) {
    try {
        const { id } = req.params;
        const { concluida } = req.body;
        await tarefaModel.atualizarTarefa(id, { concluida });
        res.json({ message: 'Tarefa atualizada' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    criarSessao,
    getTempo,
    criarTarefa,
    getTarefas,
    atualizarTarefa,
};