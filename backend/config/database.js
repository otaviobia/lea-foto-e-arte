// Configuração da conexão com o banco de dados usando Sequelize
import 'dotenv/config';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: 'postgres',
    logging: false,
  }
);

try {
  await sequelize.authenticate();
  console.log('Conexão com o banco de dados estabelecida com sucesso!');
} catch (err) {
  console.error('Erro ao conectar no banco de dados:', err);
  process.exit(1);
}

export default sequelize;
