const { Sequelize } = require('sequelize');

const DB_NAME = process.env.DB_NAME || 'pomodoro';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASS || '1910';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_DIALECT = process.env.DB_DIALECT || 'mariadb';

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  logging: false,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log(`Conexão com o banco de dados (${DB_DIALECT}) estabelecida.`);
  } catch (err) {
    console.error('Não foi possível conectar ao banco de dados:', err.message);
  }
})();

asyncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Conexão com o banco de dados (${DB_DIALECT}) estabelecida.`);
  } catch (err) {
    console.error('Não foi possível conectar ao banco de dados:', err.message);
  }
};

module.exports = sequelize;
