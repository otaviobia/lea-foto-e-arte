import 'dotenv/config';
import express, { json } from 'express';
import sequelize from './config/database.js';
import categorias from './routes/categorias.js';
import produtos from './routes/produtos.js';
import heros from './routes/heros.js';
import vendas from './routes/vendas.js';
import clientes from './routes/clientes.js';
import relatorios from './routes/relatorios.js';
import cors from 'cors';
import { login, register } from './controllers/authController.js';
import { verifyToken } from './middleware/auth.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(json());

app.use('/api/categorias', categorias);
app.use('/api/produtos', produtos);
app.use('/api/heros', heros);
app.use('/api/clientes', clientes);
app.use('/api/vendas', vendas);
app.use('/api/relatorios', relatorios);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.post('/login', login);
app.post('/register', verifyToken, register);

const PORT = process.env.PORT || 3000;

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => console.error('Erro ao conectar no banco:', err));
