import { useState } from 'react';
import { useNavigate } from 'react-router';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async e => {
    e.preventDefault(); // Evita recarregar a página
    setError('');

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password: password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('admin_token', data.token);
        navigate('/admin/layout');
      } else {
        setError(data.error);
      }
    } catch {
      setError('Erro ao conectar com o servidor');
    }
  };

  return (
    <main className="font-viminalis bg-gray-200 h-screen flex justify-center items-center">
      <form
        onSubmit={handleLogin}
        className="bg-white rounded-xl flex flex-col p-4 min-w-80 lg:min-w-100"
      >
        <div className="flex flex-col items-center">
          <img className="w-16" src="/images/tartaruga.png" alt="Tartaruga" />
          <h1 className="text-3xl font-bold">Backoffice</h1>
          <p>Léa Foto e Arte</p>
        </div>

        {/* Mensagem de erro visual */}
        {error && (
          <p className="text-red-500 text-center mt-2 font-bold">{error}</p>
        )}

        <p className="text-gray-600 mt-4">Usuário</p>
        <input
          className="bg-gray-100 p-2 rounded-xl"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="admin"
          required
        />

        <p className="text-gray-600 mt-4">Senha</p>
        <input
          className="bg-gray-100 p-2 rounded-xl"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <input
          className="bg-lfapink p-2 rounded-xl mt-6 text-white cursor-pointer hover:opacity-90"
          type="submit"
          value="Entrar"
        />
      </form>
    </main>
  );
}

export default AdminLogin;
