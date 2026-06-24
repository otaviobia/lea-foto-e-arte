import { FaPlus, FaPencilAlt, FaTrash, FaFileCode } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useConfirm } from '../../hooks/useConfirm';

function AdminVendas() {
  const confirm = useConfirm();
  const [vendas, setVendas] = useState([]);

  // Estados do Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Estados do Formulário
  const [formData, setFormData] = useState({
    canal_venda: 'whatsapp',
    status: 'aguardando_pagamento',
    produtos_texto: '',
    valor_total: '',
    valor_gastos: '0.00',
    observacoes: '',
    link_xml_nf: '',
  });
  const [xmlFile, setXmlFile] = useState(null); // Estado separado para o arquivo XML

  // Estados para a busca de Clientes
  const [buscaNome, setBuscaNome] = useState('');
  const [clientesSugeridos, setClientesSugeridos] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);

  // Carregar Vendas ao abrir a página
  useEffect(() => {
    const token = localStorage.getItem('admin_token');

    fetch(`http://localhost:3000/api/vendas/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (data.sales) setVendas(data.sales);
      })
      .catch(console.error);
  }, []);

  // Função para buscar clientes (Autocomplete)
  const handleBuscaCliente = async nome => {
    setBuscaNome(nome);
    setClienteSelecionado(null); // Reseta se o usuário voltar a digitar

    if (nome.length < 2) {
      setClientesSugeridos([]);
      return;
    }

    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch(
        `http://localhost:3000/api/clientes/search/${nome}?limit=5`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      if (data.clientes) setClientesSugeridos(data.clientes);
    } catch (err) {
      console.error(err);
    }
  };

  const selecionarCliente = cliente => {
    setClienteSelecionado(cliente);
    setBuscaNome(cliente.name);
    setClientesSugeridos([]); // Fecha a listinha
  };

  // Abre o modal para CRIAR ou EDITAR
  const openModal = (venda = null) => {
    if (venda) {
      setEditingId(venda.id);
      setFormData({
        canal_venda: venda.canal_venda || 'whatsapp',
        status: venda.status || 'aguardando_pagamento',
        produtos_texto: venda.produtos_texto || '',
        valor_total: venda.valor_total || '',
        valor_gastos: venda.valor_gastos || '',
        observacoes: venda.observacoes || '',
        link_xml_nf: venda.link_xml_nf || '',
      });
      // Pré-seleciona o cliente que já estava salvo na venda
      if (venda.Customer) {
        selecionarCliente(venda.Customer);
      }
    } else {
      setEditingId(null);
      setFormData({
        canal_venda: 'whatsapp',
        status: 'aguardando_pagamento',
        produtos_texto: '',
        valor_total: '',
        valor_gastos: '0.00',
        observacoes: '',
      });
      setClienteSelecionado(null);
      setBuscaNome('');
    }
    setXmlFile(null); // Sempre limpa o arquivo ao abrir o modal
    setClientesSugeridos([]);
    setIsModalOpen(true);
  };

  // Função para Deletar
  const handleDelete = async id => {
    if (!(await confirm('Tem certeza que deseja apagar esta venda?'))) return;

    const token = localStorage.getItem('admin_token');

    try {
      const res = await fetch(`http://localhost:3000/api/vendas/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setVendas(vendas.filter(v => v.id !== id));
      } else {
        const errorData = await res.json();
        toast.error(errorData.erro || 'Erro ao deletar a venda.');
      }
    } catch (err) {
      console.error('Erro ao deletar:', err);
    }
  };

  // Função para Salvar (Criar/Editar) usando FormData para suportar Arquivos
  const handleSubmit = async e => {
    e.preventDefault();

    if (!clienteSelecionado) {
      toast.error('Por favor, selecione um cliente na lista!');
      return;
    }

    const token = localStorage.getItem('admin_token');
    const url = editingId
      ? `http://localhost:3000/api/vendas/${editingId}`
      : `http://localhost:3000/api/vendas/`;
    const method = editingId ? 'PUT' : 'POST';

    const dataToSend = new FormData();
    dataToSend.append('customerId', clienteSelecionado.id);
    dataToSend.append('canal_venda', formData.canal_venda);
    dataToSend.append('status', formData.status);
    dataToSend.append('produtos_texto', formData.produtos_texto);
    dataToSend.append('valor_total', formData.valor_total);
    dataToSend.append('valor_gastos', formData.valor_gastos);
    dataToSend.append('observacoes', formData.observacoes);

    // Se o usuário selecionou um arquivo, anexa ele!
    if (xmlFile) {
      dataToSend.append('xml_nf', xmlFile);
    }

    try {
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: dataToSend,
      });

      if (response.ok) {
        const data = await response.json();

        const vendaCompleta = { ...data.sale, Customer: clienteSelecionado };

        if (editingId) {
          setVendas(vendas.map(v => (v.id === editingId ? vendaCompleta : v)));
        } else {
          setVendas([vendaCompleta, ...vendas]);
        }
        setIsModalOpen(false);
      } else {
        const errorData = await response.json();
        toast.error(errorData.erro || 'Erro ao salvar a venda.');
      }
    } catch (err) {
      console.error('Erro ao salvar:', err);
    }
  };

  const getBadgeStyle = canal => {
    switch (canal) {
      case 'shopee':
        return { background: '#ef4e2e', color: 'white' };
      case 'artesanou':
        return {
          background: 'linear-gradient(to right, #e84d28, #9d3c88)',
          color: 'white',
        };
      case 'akeba':
        return { background: '#f67756', color: 'white' };
      case 'whatsapp':
        return { background: '#25D366', color: 'white' };
      default:
        return { background: '#9ca3af', color: 'white' };
    }
  };

  return (
    <main className="font-viminalis bg-gray-200 min-h-screen flex flex-col p-4 gap-4 pb-12">
      <h1 className="text-4xl">Vendas</h1>

      <button
        onClick={() => openModal()}
        className="flex justify-center items-center gap-2 bg-lfapink p-2 rounded-xl text-white w-fit px-4 cursor-pointer hover:brightness-90 transition-all"
      >
        <FaPlus /> Nova Venda
      </button>

      {/* Lista de Vendas */}
      <div className="flex flex-col gap-3">
        {vendas.map(v => (
          <div
            key={v.id}
            className="bg-white rounded-xl flex justify-between items-center p-4 min-w-80 lg:min-w-100 shadow-sm border-l-4 border-lfapink"
          >
            <div className="flex flex-col">
              <p className="font-bold text-xl">
                {v.Customer?.name || 'Cliente Deletado'}
              </p>
              <p>
                {new Date(v.data_venda).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
              <div className="flex gap-4 items-center mt-1">
                <span
                  style={getBadgeStyle(v.canal_venda)}
                  className="px-2 py-1 rounded text-xs uppercase font-bold shadow-sm"
                >
                  {v.canal_venda}
                </span>
                <span className="text-sm font-semibold text-gray-600 border px-2 py-1 rounded">
                  {v.status.replace('_', ' ')}
                </span>
                {v.link_xml_nf && (
                  <a
                    href={v.link_xml_nf}
                    target="_blank"
                    rel="noreferrer"
                    className="text-green-600 hover:underline flex items-center gap-1 text-sm font-semibold"
                  >
                    <FaFileCode /> Nota Fiscal
                  </a>
                )}
              </div>
              <p className="text-gray-600 mt-2 text-sm max-w-2xl line-clamp-2">
                {v.produtos_texto}
              </p>
              <p className="text-lg font-bold text-lfapink mt-2">
                Total: R$ {Number(v.valor_total).toFixed(2)}
              </p>
            </div>

            <div className="flex gap-3 text-xl">
              <button
                onClick={() => openModal(v)}
                className="text-gray-500 hover:brightness-75 transition-all"
              >
                <FaPencilAlt />
              </button>
              <button
                onClick={() => handleDelete(v.id)}
                className="text-lfapink hover:brightness-75 transition-all"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL DE VENDAS */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-2xl flex flex-col gap-4 shadow-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold font-viminalis">
              {editingId ? 'Editar Venda' : 'Nova Venda'}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* --- BUSCA DE CLIENTE --- */}
              <div className="flex flex-col gap-1 relative">
                <label className="text-sm font-semibold text-lfapink">
                  Cliente *
                </label>
                <input
                  type="text"
                  value={buscaNome}
                  onChange={e => handleBuscaCliente(e.target.value)}
                  placeholder="Digite o nome do cliente..."
                  className={`border rounded p-2 outline-none focus:border-lfapink ${clienteSelecionado ? 'bg-green-50 border-green-400 font-semibold' : ''}`}
                  required
                />

                {/* Dropdown de sugestões */}
                {clientesSugeridos.length > 0 && !clienteSelecionado && (
                  <ul className="absolute top-16.25 left-0 w-full bg-white border border-gray-200 rounded shadow-lg z-10 max-h-40 overflow-y-auto">
                    {clientesSugeridos.map(c => (
                      <li
                        key={c.id}
                        onClick={() => selecionarCliente(c)}
                        className="p-2 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                      >
                        <p className="font-semibold">{c.name}</p>
                        <p className="text-xs text-gray-500">
                          {c.whatsapp} | {c.cpf}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* --- CANAL E STATUS --- */}
              <div className="flex gap-4">
                <div className="flex flex-col gap-1 w-1/2">
                  <label className="text-sm font-semibold">
                    Canal de Venda *
                  </label>
                  <select
                    value={formData.canal_venda}
                    onChange={e =>
                      setFormData({ ...formData, canal_venda: e.target.value })
                    }
                    className="border rounded p-2 outline-none focus:border-lfapink bg-white"
                  >
                    <option value="shopee">Shopee</option>
                    <option value="artesanou">Artesanou</option>
                    <option value="akeba">Akeba</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1 w-1/2">
                  <label className="text-sm font-semibold">Status *</label>
                  <select
                    value={formData.status}
                    onChange={e =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="border rounded p-2 outline-none focus:border-lfapink bg-white"
                  >
                    <option value="aguardando_pagamento">
                      Aguardando Pagamento
                    </option>
                    <option value="em_producao">Em Produção</option>
                    <option value="enviado">Enviado</option>
                    <option value="concluido">Concluído</option>
                  </select>
                </div>
              </div>

              {/* --- PRODUTOS E VALORES --- */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold">
                  Produtos Vendidos *
                </label>
                <textarea
                  required
                  rows="3"
                  value={formData.produtos_texto}
                  onChange={e =>
                    setFormData({ ...formData, produtos_texto: e.target.value })
                  }
                  className="border rounded p-2 outline-none focus:border-lfapink"
                  placeholder="Ex: 2x Canecas, 1x Topo de Bolo..."
                />
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col gap-1 w-1/2">
                  <label className="text-sm font-semibold">
                    Valor Total Pago (R$) *
                  </label>
                  <input
                    required
                    type="number"
                    step="0.01"
                    value={formData.valor_total}
                    onChange={e =>
                      setFormData({ ...formData, valor_total: e.target.value })
                    }
                    className="border rounded p-2 outline-none focus:border-lfapink font-bold text-lfapink"
                  />
                </div>
                <div className="flex flex-col gap-1 w-1/2">
                  <label className="text-sm font-semibold">
                    Gastos / Taxas (R$)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.valor_gastos}
                    onChange={e =>
                      setFormData({ ...formData, valor_gastos: e.target.value })
                    }
                    className="border rounded p-2 outline-none focus:border-lfapink text-red-500"
                  />
                </div>
              </div>

              {/* --- ARQUIVO XML DA NOTA --- */}
              <div className="flex flex-col gap-1 bg-blue-50 p-3 rounded border border-blue-200">
                <label className="text-sm font-semibold text-blue-800 flex items-center gap-2">
                  <FaFileCode /> Upload XML da Nota Fiscal
                </label>

                {editingId && formData.link_xml_nf && (
                  <p className="text-xs text-green-700 mb-2 bg-green-100 p-1 px-2 rounded w-fit">
                    ✓ Nota atual já enviada.{' '}
                    <a
                      href={formData.link_xml_nf}
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold hover:underline"
                    >
                      Ver arquivo
                    </a>
                  </p>
                )}

                <input
                  type="file"
                  accept=".xml"
                  onChange={e => setXmlFile(e.target.files[0])}
                  className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 cursor-pointer"
                />
                <p className="text-xs text-blue-600 mt-1">
                  {editingId && formData.link_xml_nf
                    ? 'Selecione um arquivo apenas se quiser substituir a nota atual.'
                    : 'Nenhum arquivo XML anexado ainda.'}
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold">
                  Observações Internas
                </label>
                <textarea
                  rows="2"
                  value={formData.observacoes}
                  onChange={e =>
                    setFormData({ ...formData, observacoes: e.target.value })
                  }
                  className="border rounded p-2 outline-none focus:border-lfapink"
                  placeholder="Ex: Cliente pediu urgência..."
                />
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

export default AdminVendas;
