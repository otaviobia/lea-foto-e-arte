import 'dotenv/config';
import express, { json } from 'express';
import sequelize from './config/database.js';
import categorias from './routes/categorias.js';
import cors from 'cors';

const app = express();

app.use(json());

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use('/api/categorias', categorias);

const PORT = process.env.PORT || 3000;

sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => console.error('Erro ao conectar no banco:', err));