import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

// Cria um admin
export async function register(req, res) {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({ username, password: hashedPassword });
    res
      .status(201)
      .json({ message: 'Admin created successfully', adminId: admin.id });
  } catch (error) {
    res.status(500).json({ error: 'Creation failed' });
  }
}

// Faz login e gera um token com JWT
export async function login(req, res) {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ where: { username } });
    if (!admin)
      return res.status(401).json({ error: 'Usuário ou senha inválidos' });

    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword)
      return res.status(401).json({ error: 'Usuário ou senha inválidos' });

    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
}
