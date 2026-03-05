const sequelize = require('../config/bd');

async function criarSessao(sessao) {
    return sequelize.query(
        'INSERT INTO sessoes_pomodoro (cliente_id, tipo, inicio, fim, duracao, data) VALUES (?, ?, ?, ?, ?, ?)',
        {
            replacements: [sessao.cliente_id, sessao.tipo, sessao.inicio, sessao.fim, sessao.duracao, sessao.data],
            type: sequelize.QueryTypes.INSERT,
        }
    );
}

async function buscarSessoesPorCliente(cliente_id, periodo) {
    let query = 'SELECT * FROM sessoes_pomodoro WHERE cliente_id = ?';
    const replacements = [cliente_id];

    if (periodo) {
        query += ' AND data >= ? AND data <= ?';
        replacements.push(periodo.inicio, periodo.fim);
    }

    return sequelize.query(query, {
        replacements,
        type: sequelize.QueryTypes.SELECT,
    });
}

async function calcularHorasTotais(cliente_id, periodo) {
    const sessoes = await buscarSessoesPorCliente(cliente_id, periodo);
    let totalMinutos = 0;
    sessoes.forEach(sessao => {
        totalMinutos += sessao.duracao;
    });
    return totalMinutos / 60; // horas
}

module.exports = {
    criarSessao,
    buscarSessoesPorCliente,
    calcularHorasTotais,
};