const sequelize = require('../config/bd');



module.exports = {
    criarTarefa,
    buscarTarefasPorCliente,
    atualizarTarefa,
    deletarTarefa,
    contarTarefasConcluidas,
};