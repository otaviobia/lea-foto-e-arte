import { FaPlus, FaPencilAlt, FaTrash } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { useState, useEffect } from "react";

function AdminProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  
  // Estados do Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null); // Se for null, é criação. Se tiver ID, é edição.
  
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    shopeeLink: '',
    images: '',
    categoryId: ''
  });

  useEffect(() => {
    // Busca Produtos
    fetch(`http://localhost:3000/api/produtos/`)
      .then(res => res.json())
      .then(data => setProdutos(data.produtos))
      .catch(console.error);
      
    // Busca Categorias (para o Select do formulário)
    fetch(`http://localhost:3000/api/categorias/`)
      .then(res => res.json())
      .then(data => setCategorias(data.categorias || []))
      .catch(console.error);
  }, []);

  // Abre o modal para CRIAR ou EDITAR
  const openModal = (produto = null) => {
    if (produto) {
      setEditingId(produto.id);
      setFormData({
        title: produto.title || '',
        price: produto.price || '',
        description: produto.description || '',
        shopeeLink: produto.shopeeLink || '',
        images: produto.images ? produto.images.join(', ') : '', // Transforma array em string separada por vírgula
        categoryId: produto.categoryId || ''
      });
    } else {
      setEditingId(null);
      setFormData({ title: '', price: '', description: '', shopeeLink: '', images: '', categoryId: '' });
    }
    setIsModalOpen(true);
  };

  // Função para Deletar
  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja apagar este produto?")) return;

    try {
      const res = await fetch(`http://localhost:3000/api/produtos/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProdutos(produtos.filter(p => p.id !== id));
      }
    } catch (err) {
      console.error("Erro ao deletar:", err);
    }
  };

  // Função para Salvar (Criar ou Editar)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Tratamento dos dados antes de enviar
    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      categoryId: formData.categoryId ? parseInt(formData.categoryId) : null,
      // Transforma a string separada por vírgulas de volta em uma Array de strings
      images: formData.images.split(',').map(img => img.trim()).filter(img => img !== '')
    };

    const url = editingId 
      ? `http://localhost:3000/api/produtos/${editingId}` 
      : `http://localhost:3000/api/produtos/`;
      
    const method = editingId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        
        if (editingId) {
          // Atualiza o produto na lista local
          setProdutos(produtos.map(p => p.id === editingId ? data.produto : p));
        } else {
          // Adiciona o novo produto na lista
          setProdutos([...produtos, data.produto]);
        }
        setIsModalOpen(false);
      } else {
        alert("Erro ao salvar o produto.");
      }
    } catch (err) {
      console.error("Erro ao salvar:", err);
    }
  };

  return (
    <main className="font-viminalis bg-gray-200 min-h-screen flex flex-col p-4 gap-4 pb-12">
      <h1 className="text-4xl">Produtos</h1>
      
      <button 
        onClick={() => openModal()} 
        className="flex justify-center items-center gap-2 bg-lfapink p-2 rounded-xl text-white w-fit px-4 cursor-pointer hover:brightness-90 transition-all"
      >
        <FaPlus/> Novo Produto
      </button>

      {/* Lista de Produtos */}
      <div className="flex flex-col gap-3">
        {produtos.map((produto) => (
          <div key={produto.id} className="bg-white rounded-xl flex justify-between items-center p-3 min-w-80 lg:min-w-100">
            <div className="flex flex-col">
              <p className="font-bold text-lg">{produto.title}</p>
              <div className="flex gap-4 items-center">
                <p className="text-gray-600">R$ {Number(produto.price).toFixed(2).replace('.', ',')}</p>
                {produto.shopeeLink && (
                  <a className="text-lfapink brightness-90 flex items-center gap-1 text-sm hover:underline" href={produto.shopeeLink} target="_blank" rel="noreferrer">
                    Shopee <FiExternalLink />
                  </a>
                )}
              </div>
            </div>
            
            <div className="flex gap-3 text-xl">
              <button onClick={() => openModal(produto)} className="text-gray-500 hover:brightness-75 transition-all">
                <FaPencilAlt />
              </button>
              <button onClick={() => handleDelete(produto.id)} className="text-lfapink hover:brightness-75 transition-all">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL DE PRODUTOS */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg flex flex-col gap-4 shadow-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold font-viminalis">
              {editingId ? 'Editar Produto' : 'Novo Produto'}
            </h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold">Título *</label>
                <input required type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="border rounded p-2 outline-none focus:border-lfapink" />
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col gap-1 w-1/3">
                  <label className="text-sm font-semibold">Preço (R$) *</label>
                  <input required type="number" step="0.01" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="border rounded p-2 outline-none focus:border-lfapink" />
                </div>

                <div className="flex flex-col gap-1 w-2/3">
                  <label className="text-sm font-semibold">Categoria</label>
                  <select value={formData.categoryId} onChange={(e) => setFormData({...formData, categoryId: e.target.value})} className="border rounded p-2 outline-none focus:border-lfapink bg-white">
                    <option value="">Sem categoria</option>
                    {categorias.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold">Link da Shopee</label>
                <input type="url" value={formData.shopeeLink} onChange={(e) => setFormData({...formData, shopeeLink: e.target.value})} className="border rounded p-2 outline-none focus:border-lfapink" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700 flex justify-between">
                  <span>Imagens (URLs)</span> 
                  <span className="text-xs font-normal text-gray-500">Separe por vírgula</span>
                </label>
                <textarea rows="2" value={formData.images} onChange={(e) => setFormData({...formData, images: e.target.value})} className="border rounded p-2 outline-none focus:border-lfapink text-sm" placeholder="http://imagem1.jpg, http://imagem2.jpg"></textarea>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold">Descrição</label>
                <textarea rows="4" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="border rounded p-2 outline-none focus:border-lfapink" />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-all">
                  Cancelar
                </button>
                <button type="submit" className="px-4 py-2 bg-lfapink text-white rounded hover:brightness-90 transition-all">
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

export default AdminProdutos;