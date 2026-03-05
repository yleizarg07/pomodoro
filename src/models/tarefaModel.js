const sequelize = require('../config/bd');

async function criarTarefa(tarefa) {
    return sequelize.query(
        'INSERT INTO tarefas (cliente_id, descricao, concluida, data_criacao) VALUES (?, ?, ?, ?)',
        {
            replacements: [tarefa.cliente_id, tarefa.descricao, tarefa.concluida || 0, tarefa.data_criacao || new Date()],
            type: sequelize.QueryTypes.INSERT,
        }
    );
}

async function buscarTarefasPorCliente(cliente_id) {
    return sequelize.query(
        'SELECT * FROM tarefas WHERE cliente_id = ? ORDER BY data_criacao DESC',
        {
            replacements: [cliente_id],
            type: sequelize.QueryTypes.SELECT,
        }
    );
}

async function atualizarTarefa(id, dados) {
    return sequelize.query(
        'UPDATE tarefas SET descricao = ?, concluida = ? WHERE id = ?',
        {
            replacements: [dados.descricao, dados.concluida, id],
            type: sequelize.QueryTypes.UPDATE,
        }
    );
}

async function deletarTarefa(id) {
    return sequelize.query(
        'DELETE FROM tarefas WHERE id = ?',
        {
            replacements: [id],
            type: sequelize.QueryTypes.DELETE,
        }
    );
}

async function contarTarefasConcluidas(cliente_id, periodo) {
    let query = 'SELECT COUNT(*) as count FROM tarefas WHERE cliente_id = ? AND concluida = 1';
    const replacements = [cliente_id];

    if (periodo) {
        query += ' AND data_criacao >= ? AND data_criacao <= ?';
        replacements.push(periodo.inicio, periodo.fim);
    }

    const [result] = await sequelize.query(query, {
        replacements,
        type: sequelize.QueryTypes.SELECT,
    });
    return result.count;
}

module.exports = {
    criarTarefa,
    buscarTarefasPorCliente,
    atualizarTarefa,
    deletarTarefa,
    contarTarefasConcluidas,
};