import { FaPlus, FaPencilAlt, FaTrash, FaDotCircle } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useConfirm } from '../../hooks/useConfirm';

function AdminClientes() {
  const confirm = useConfirm();
  const [clientes, setClientes] = useState([]);

  // Estados do Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    whatsapp: '',
    email: '',
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('admin_token');

    fetch(`http://localhost:3000/api/clientes/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.clientes) {
          setClientes(data.clientes);
        } else {
          console.error('Erro do backend:', data.erro);
        }
      })
      .catch(console.error);
  }, []);

  // Abre o modal para CRIAR ou EDITAR
  const openModal = (cliente = null) => {
    if (cliente) {
      setEditingId(cliente.id);
      setFormData({
        name: cliente.name || '',
        cpf: cliente.cpf || '',
        whatsapp: cliente.whatsapp || '',
        email: cliente.email || '',
        cep: cliente.cep || '',
        logradouro: cliente.logradouro || '',
        numero: cliente.numero || '',
        complemento: cliente.complemento || '',
        bairro: cliente.bairro || '',
        cidade: cliente.cidade || '',
        estado: cliente.estado || '',
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        cpf: '',
        whatsapp: '',
        email: '',
        cep: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
      });
    }
    setIsModalOpen(true);
  };

  // Função para Deletar
  const handleDelete = async id => {
    if (!(await confirm('Tem certeza que deseja apagar este cliente?'))) return;

    const token = localStorage.getItem('admin_token');

    try {
      const res = await fetch(`http://localhost:3000/api/clientes/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setClientes(clientes.filter(c => c.id !== id));
      } else {
        const errorData = await res.json();
        toast.error(errorData.erro || 'Erro ao deletar o cliente.');
      }
    } catch (err) {
      console.error('Erro ao deletar:', err);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Pega o token para enviar na requisição
    const token = localStorage.getItem('admin_token');

    const url = editingId
      ? `http://localhost:3000/api/clientes/${editingId}`
      : `http://localhost:3000/api/clientes/`;

    const method = editingId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();

        if (editingId) {
          // Atualiza o cliente na lista local
          setClientes(
            clientes.map(c => (c.id === editingId ? data.customer : c))
          );
        } else {
          // Adiciona o novo cliente na lista
          setClientes([...clientes, data.customer]);
        }
        setIsModalOpen(false);
      } else {
        const errorData = await response.json();
        toast.error(errorData.erro || 'Erro ao salvar o cliente.');
      }
    } catch (err) {
      console.error('Erro ao salvar:', err);
    }
  };

  return (
    <main className="font-viminalis bg-gray-200 min-h-screen flex flex-col p-4 gap-4 pb-12">
      <h1 className="text-4xl">Clientes</h1>

      <button
        onClick={() => openModal()}
        className="flex justify-center items-center gap-2 bg-lfapink p-2 rounded-xl text-white w-fit px-4 cursor-pointer hover:brightness-90 transition-all"
      >
        <FaPlus /> Novo Cliente
      </button>

      {/* Lista de Produtos */}
      <div className="flex flex-col gap-3">
        {clientes.map(c => (
          <div
            key={c.id}
            className="bg-white rounded-xl flex justify-between items-center p-3 min-w-80 lg:min-w-100"
          >
            <div className="flex flex-col">
              <p className="font-bold text-lg">{c.name}</p>
              <div className="flex gap-4 items-center">
                <p className="text-gray-600">
                  {c.cpf ? c.cpf : 'CPF não cadastrado'}
                </p>
                <FaDotCircle className="text-gray-600 w-1 h-1" />
                <p className="text-gray-600">
                  {c.email ? c.email : 'Email não cadastrado'}
                </p>
                <FaDotCircle className="text-gray-600 w-1 h-1" />
                <p className="text-gray-600">
                  {c.whatsapp ? c.whatsapp : 'WhatsApp não cadastrado'}
                </p>
              </div>
              {c.logradouro && (
                <p className="text-lg">
                  {c.logradouro}, {c.numero},{' '}
                  {c.complemento ? c.complemento + ', ' : ''}
                  {c.bairro}, {c.cidade}, {c.estado} - {c.cep}
                </p>
              )}
            </div>

            <div className="flex gap-3 text-xl">
              <button
                onClick={() => openModal(c)}
                className="text-gray-500 hover:brightness-75 transition-all"
              >
                <FaPencilAlt />
              </button>
              <button
                onClick={() => handleDelete(c.id)}
                className="text-lfapink hover:brightness-75 transition-all"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL DE PRODUTOS */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-2xl flex flex-col gap-4 shadow-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold font-viminalis">
              {editingId ? 'Editar Cliente' : 'Novo Cliente'}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {/* --- DADOS PESSOAIS --- */}
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-1 mt-2">
                Dados Pessoais
              </h3>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold">Nome Completo *</label>
                <input
                  required
                  type="text"
                  value={formData.name || ''}
                  onChange={e =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="border rounded p-2 outline-none focus:border-lfapink"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col gap-1 w-1/2">
                  <label className="text-sm font-semibold">CPF</label>
                  <input
                    type="text"
                    value={formData.cpf || ''}
                    onChange={e =>
                      setFormData({ ...formData, cpf: e.target.value })
                    }
                    className="border rounded p-2 outline-none focus:border-lfapink"
                    placeholder="000.000.000-00"
                  />
                </div>
                <div className="flex flex-col gap-1 w-1/2">
                  <label className="text-sm font-semibold">WhatsApp</label>
                  <input
                    type="text"
                    value={formData.whatsapp || ''}
                    onChange={e =>
                      setFormData({ ...formData, whatsapp: e.target.value })
                    }
                    className="border rounded p-2 outline-none focus:border-lfapink"
                    placeholder="(00) 90000-0000"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold">E-mail</label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={e =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="border rounded p-2 outline-none focus:border-lfapink"
                />
              </div>

              {/* --- ENDEREÇO --- */}
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-1 mt-4">
                Endereço
              </h3>

              <div className="flex gap-4">
                <div className="flex flex-col gap-1 w-1/3">
                  <label className="text-sm font-semibold">CEP</label>
                  <input
                    type="text"
                    value={formData.cep || ''}
                    onChange={e =>
                      setFormData({ ...formData, cep: e.target.value })
                    }
                    className="border rounded p-2 outline-none focus:border-lfapink"
                  />
                </div>
                <div className="flex flex-col gap-1 w-2/3">
                  <label className="text-sm font-semibold">
                    Logradouro (Rua)
                  </label>
                  <input
                    type="text"
                    value={formData.logradouro || ''}
                    onChange={e =>
                      setFormData({ ...formData, logradouro: e.target.value })
                    }
                    className="border rounded p-2 outline-none focus:border-lfapink"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col gap-1 w-1/3">
                  <label className="text-sm font-semibold">Número</label>
                  <input
                    type="text"
                    value={formData.numero || ''}
                    onChange={e =>
                      setFormData({ ...formData, numero: e.target.value })
                    }
                    className="border rounded p-2 outline-none focus:border-lfapink"
                  />
                </div>
                <div className="flex flex-col gap-1 w-2/3">
                  <label className="text-sm font-semibold">Complemento</label>
                  <input
                    type="text"
                    value={formData.complemento || ''}
                    onChange={e =>
                      setFormData({ ...formData, complemento: e.target.value })
                    }
                    className="border rounded p-2 outline-none focus:border-lfapink"
                    placeholder="Apto, Bloco, etc."
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col gap-1 w-2/5">
                  <label className="text-sm font-semibold">Bairro</label>
                  <input
                    type="text"
                    value={formData.bairro || ''}
                    onChange={e =>
                      setFormData({ ...formData, bairro: e.target.value })
                    }
                    className="border rounded p-2 outline-none focus:border-lfapink"
                  />
                </div>
                <div className="flex flex-col gap-1 w-2/5">
                  <label className="text-sm font-semibold">Cidade</label>
                  <input
                    type="text"
                    value={formData.cidade || ''}
                    onChange={e =>
                      setFormData({ ...formData, cidade: e.target.value })
                    }
                    className="border rounded p-2 outline-none focus:border-lfapink"
                  />
                </div>
                <div className="flex flex-col gap-1 w-1/5">
                  <label className="text-sm font-semibold">Estado</label>
                  <input
                    type="text"
                    maxLength="2"
                    value={formData.estado || ''}
                    onChange={e =>
                      setFormData({ ...formData, estado: e.target.value })
                    }
                    className="border rounded p-2 outline-none focus:border-lfapink uppercase"
                    placeholder="SP"
                  />
                </div>
              </div>

              {/* --- BOTÕES --- */}
              <div className="flex justify-end gap-2 mt-4 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-all font-semibold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-lfapink text-white rounded hover:brightness-90 transition-all font-semibold cursor-pointer"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default AdminClientes;
