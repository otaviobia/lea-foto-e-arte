import 'dotenv/config';
import express, { json } from 'express';
import sequelize from './config/database.js';
import categorias from './routes/categorias.js';
import produtos from './routes/produtos.js';
import heros from './routes/heros.js';
import cors from 'cors';

const app = express();

app.use(json());

app.use(cors({
  origin: 'http://localhost:5173',
}));

app.use('/api/categorias', categorias);
app.use('/api/produtos', produtos);
app.use('/api/heros', heros);

const PORT = process.env.PORT || 3000;

sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => console.error('Erro ao conectar no banco:', err));