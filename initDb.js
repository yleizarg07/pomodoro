const sequelize = require('./src/config/bd');

async function initDatabase() {
    try {
        // Criar tabela clientes se não existir
        await sequelize.query(`
            CREATE TABLE IF NOT EXISTS clientes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                senha VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Criar tabela sessoes_pomodoro
        await sequelize.query(`
            CREATE TABLE IF NOT EXISTS sessoes_pomodoro (
                id INT AUTO_INCREMENT PRIMARY KEY,
                cliente_id INT NOT NULL,
                tipo ENUM('pomodoro', 'short_break', 'long_break') NOT NULL,
                inicio DATETIME,
                fim DATETIME,
                duracao INT, -- em minutos
                data DATE NOT NULL,
                FOREIGN KEY (cliente_id) REFERENCES clientes(id)
            )
        `);

        // Criar tabela tarefas
        await sequelize.query(`
            CREATE TABLE IF NOT EXISTS tarefas (
                id INT AUTO_INCREMENT PRIMARY KEY,
                cliente_id INT NOT NULL,
                descricao TEXT NOT NULL,
                concluida BOOLEAN DEFAULT FALSE,
                data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (cliente_id) REFERENCES clientes(id)
            )
        `);

        console.log('Tabelas criadas com sucesso.');
    } catch (error) {
        console.error('Erro ao criar tabelas:', error);
    }
}

initDatabase();