import { useState, useEffect } from "react";
import { FaImage, FaStar, FaTrash, FaArrowUp, FaArrowDown, FaUpload } from "react-icons/fa";

function AdminLayout() {
  const [categorias, setCategorias] = useState([]);
  const [heros, setHeros] = useState([]);

  // 1. Busca todas as categorias ao carregar a página
  useEffect(() => {
    fetch('http://localhost:3000/api/categorias')
      .then(res => res.json())
      .then(data => {
        // Ordena localmente as que são destacadas por 'featuredOrder' para exibir bonito na tela
        const ordenadas = (data.categorias || []).sort((a, b) => a.featuredOrder - b.featuredOrder);
        setCategorias(ordenadas);
      });
  }, []);

  // 2. Função para Ativar / Desativar o Destaque
  const handleToggleFeatured = async (id, statusAtual) => {
    const token = localStorage.getItem('admin_token');
    const novoStatus = !statusAtual;

    try {
      const response = await fetch(`http://localhost:3000/api/categorias/${id}/destaque`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ isFeatured: novoStatus })
      });

      if (response.ok) {
        // Atualiza o estado localmente para refletir na tela na hora
        setCategorias(categorias.map(cat => 
          cat.id === id ? { ...cat, isFeatured: novoStatus } : cat
        ));
      }
    } catch (err) {
      console.error("Erro ao mudar destaque:", err);
    }
  };

  // 3. Função para Mover Categoria para Cima ou para Baixo na lista
  const moverCategoria = (index, direcao) => {
    const novasCategorias = [...categorias];
    const itemMovido = novasCategorias[index];
    
    // Calcula a nova posição
    const novaPosicao = direcao === 'subir' ? index - 1 : index + 1;

    // Proteção para não sair dos limites do array
    if (novaPosicao < 0 || novaPosicao >= novasCategorias.length) return;

    // Troca os objetos de lugar no array (Swap)
    novasCategorias[index] = novasCategorias[novaPosicao];
    novasCategorias[novaPosicao] = itemMovido;

    setCategorias(novasCategorias);
  };

  // 4. Envia a ordem atual da tela para salvar definitivamente no Banco de Dados
  const handleSalvarOrdenacao = async () => {
    const token = localStorage.getItem('admin_token');

    // Filtra apenas as que estão destacadas e mapeia gerando o index correto da ordem (0, 1, 2...)
    const listaParaEnviar = categorias
      .filter(cat => cat.isFeatured)
      .map((cat, index) => ({
        id: cat.id,
        ordem: index
      }));

    try {
      const response = await fetch('http://localhost:3000/api/categorias/reordenar-destaques', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ listaOrdenada: listaParaEnviar })
      });

      if (response.ok) {
        alert("Ordenação das categorias salva com sucesso! 🎉");
      }
    } catch (err) {
      console.error("Erro ao salvar ordenação:", err);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Tem certeza que deseja apagar?")) return;
    
    const token = localStorage.getItem('admin_token');

    await fetch(`http://localhost:3000/api/categorias/${id}`, { 
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    setCategorias(categorias.filter(c => c.id !== id)); // Atualiza a tela
  };

  // Estados para o Modal de Categoria
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [categoryImageFile, setCategoryImageFile] = useState(null);

  // Função para criar a categoria no banco
  const handleCreateCategory = async (e) => {
    e.preventDefault(); // Evita que a página recarregue ao dar submit no form

    if (!newCategoryName) {
      return alert("O nome da categoria é obrigatório!");
    }

    const token = localStorage.getItem('admin_token');
    const dataToSend = new FormData();
    dataToSend.append('name', newCategoryName);
    if (categoryImageFile) dataToSend.append('image', categoryImageFile);

    try {
      const response = await fetch('http://localhost:3000/api/categorias', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: dataToSend
      });

      if (response.ok) {
        const data = await response.json();
        // Adiciona a nova categoria na lista da tela sem precisar recarregar
        setCategorias([...categorias, data.categoria]);
        // Limpa os campos e fecha o modal
        setNewCategoryName('');
        setCategoryImageFile(null);
        setIsCategoryModalOpen(false);
      } else {
        const errorData = await response.json();
        alert(`Erro: ${errorData.erro}`);
      }
    } catch (err) {
      console.error("Erro ao criar categoria:", err);
    }
  };

  // 1. Busca os dados ao carregar
  useEffect(() => {
    fetch('http://localhost:3000/api/heros')
      .then(res => res.json())
      .then(data => setHeros(data.heros || []));
  }, []);

  // 2. Função para deletar
  const handleDeleteHero = async (id) => {
    if (!window.confirm("Tem certeza que deseja apagar?")) return;

    const token = localStorage.getItem('admin_token');
    
    await fetch(`http://localhost:3000/api/heros/${id}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
    setHeros(heros.filter(h => h.id !== id)); // Atualiza a tela
  };

  // 3. Função para ativar/desativar
  const handleToggleActive = async (hero) => {
    const updatedStatus = !hero.isActive;
    const token = localStorage.getItem('admin_token');
    
    await fetch(`http://localhost:3000/api/heros/${hero.id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
       },
      body: JSON.stringify({ isActive: updatedStatus })
    });
    
    // Atualiza a tela localmente
    setHeros(heros.map(h => h.id === hero.id ? { ...h, isActive: updatedStatus } : h));
  };

  // Função para Mover Banner (Hero) para Cima ou para Baixo
  const moverHero = (index, direcao) => {
    const novosHeros = [...heros];
    const itemMovido = novosHeros[index];
    
    const novaPosicao = direcao === 'subir' ? index - 1 : index + 1;

    if (novaPosicao < 0 || novaPosicao >= novosHeros.length) return;

    novosHeros[index] = novosHeros[novaPosicao];
    novosHeros[novaPosicao] = itemMovido;

    setHeros(novosHeros);
  };

  // Envia a nova ordem dos Banners para o Banco de Dados
  const handleSalvarOrdenacaoHeros = async () => {
    const token = localStorage.getItem('admin_token');
    
    const listaParaEnviar = heros.map((hero, index) => ({
      id: hero.id,
      order: index // Aqui a coluna do banco se chama 'order'
    }));

    try {
      const response = await fetch('http://localhost:3000/api/heros/reordenar', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ listaOrdenada: listaParaEnviar })
      });

      if (response.ok) {
        alert("Ordenação dos banners salva com sucesso! 🎉");
      }
    } catch (err) {
      console.error("Erro ao salvar ordenação dos banners:", err);
    }
  };

  // Estados para o Modal de Banners (Heros)
  const [isHeroModalOpen, setIsHeroModalOpen] = useState(false);
  const [heroImageFile, setHeroImageFile] = useState(null);

  // Função para criar o banner no banco
  const handleCreateHero = async (e) => {
    e.preventDefault();

    if (!heroImageFile) return alert("Selecione uma imagem!");

    const token = localStorage.getItem('admin_token');
    const dataToSend = new FormData();
    dataToSend.append('isActive', true);
    dataToSend.append('order', heros.length);
    dataToSend.append('image', heroImageFile);

    try {
      const response = await fetch('http://localhost:3000/api/heros', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: dataToSend
      });

      if (response.ok) {
        const data = await response.json();
        // Adiciona o novo banner na tela
        setHeros([...heros, data.hero]);
        // Limpa e fecha o modal
        setHeroImageFile(null);
        setIsHeroModalOpen(false);
      } else {
        const errorData = await response.json();
        alert(`Erro: ${errorData.erro}`);
      }
    } catch (err) {
      console.error("Erro ao criar banner:", err);
    }
  };

  return (
    <main className="font-viminalis bg-gray-200 min-h-screen flex flex-col p-4 gap-4">
      <h1 className="text-4xl">Layout da Página Inicial</h1>
      
      <div className="bg-white rounded-xl flex flex-col p-4 min-w-80 lg:min-w-120 w-fit gap-3">
        <div className="flex justify-between items-center w-full">
          <p className="flex items-center gap-0.5 text-xl pr-2">
            <FaImage className="text-lfapink w-8" />Carrossel de Banners
          </p>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsHeroModalOpen(true)}
              className="bg-lfapink text-white text-sm px-3 py-1 rounded-lg hover:brightness-90 transition-all"
            >
              Novo Banner
            </button>

            <button 
              onClick={handleSalvarOrdenacaoHeros}
              className="bg-lfagreen text-white text-sm px-3 py-1 rounded-lg hover:brightness-90 transition-all"
            >
              Salvar Ordem
            </button>
          </div>
        </div>

        {/* Mapeando os heros vindos do banco */}
        {heros.map((hero, index) => (
          <div key={hero.id} className="bg-gray-200 rounded-lg p-2 flex justify-between items-center mt-2 gap-4">
            <img className="w-64 rounded-lg aspect-video object-cover" src={hero.image} alt="Hero" />
            
            <input 
              type="checkbox" 
              checked={hero.isActive} 
              onChange={() => handleToggleActive(hero)} 
            />
            
            <div className="flex justify-center items-center gap-2">
              <button 
                onClick={() => moverHero(index, 'subir')}
                title="Mover para cima"
                className="p-1 hover:text-lfapink"
              >
                <FaArrowUp />
              </button>
              <button 
                onClick={() => moverHero(index, 'descer')}
                title="Mover para baixo"
                className="p-1 hover:text-lfapink"
              >
                <FaArrowDown />
              </button>
              <button onClick={() => handleDeleteHero(hero.id)}>
                <FaTrash className="w-6 h-6 text-lfapink brightness-90"/>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* SEÇÃO DE CATEGORIAS EM DESTAQUE */}
      <div className="bg-white rounded-xl flex flex-col p-4 min-w-80 lg:min-w-120 w-fit gap-3">
        <div className="flex justify-between items-center w-full">
          <p className="flex items-center gap-0.5 text-xl pr-2">
            <FaStar className="text-lfapink w-8" />Categorias em Destaque
          </p>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsCategoryModalOpen(true)}
              className="bg-lfapink text-white text-sm px-3 py-1 rounded-lg hover:brightness-90 transition-all"
            >
              Nova Categoria
            </button>
            
            <button 
              onClick={handleSalvarOrdenacao}
              className="bg-lfagreen text-white text-sm px-3 py-1 rounded-lg hover:brightness-90 transition-all"
            >
              Salvar Ordem
            </button>
          </div>
        </div>

        {/* Listando todas as categorias cadastradas */}
        {categorias.map((categoria, index) => (
          <div key={categoria.id} className="bg-gray-200 rounded-lg p-2 flex justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={categoria.isFeatured} 
                onChange={() => handleToggleFeatured(categoria.id, categoria.isFeatured)} 
              />
              <span className={categoria.isFeatured ? "font-bold text-black" : "text-gray-500 line-through"}>
                {categoria.name}
              </span>
            </div>

            {/* Só exibe os botões de mover se ela estiver de fato marcada como destaque */}
            <div className="flex justify-center items-center gap-2">
              {categoria.isFeatured && (
                <>
                  <button 
                    onClick={() => moverCategoria(index, 'subir')}
                    title="Mover para cima"
                    className="p-1 hover:text-lfapink"
                  >
                    <FaArrowUp />
                  </button>
                  <button 
                    onClick={() => moverCategoria(index, 'descer')}
                    title="Mover para baixo"
                    className="p-1 hover:text-lfapink"
                  >
                    <FaArrowDown />
                  </button>
                </>
              )}
              <button onClick={() => handleDeleteCategory(categoria.id)}>
                <FaTrash className="w-6 h-6 text-lfapink brightness-90"/>
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* MODAL DE NOVA CATEGORIA */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 flex flex-col gap-4 shadow-xl">
            <h2 className="text-2xl font-bold font-viminalis">Criar Nova Categoria</h2>
            
            <form onSubmit={handleCreateCategory} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold">Nome da Categoria *</label>
                <input 
                  type="text" 
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 outline-none focus:border-lfapink"
                  placeholder="Ex: Casamento"
                  required
                />
              </div>

              <div className="flex flex-col gap-1 bg-gray-50 p-3 rounded border border-gray-200">
                <label className="text-sm font-semibold flex items-center gap-2"><FaUpload /> Imagem de Capa</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setCategoryImageFile(e.target.files[0])}
                  className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-200 hover:file:bg-gray-300 cursor-pointer mt-1"
                />
              </div>

              <div className="flex justify-end gap-2 mt-2">
                <button 
                  type="button" 
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-lfapink text-white rounded-lg hover:brightness-90"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isHeroModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 flex flex-col gap-4 shadow-xl">
            <h2 className="text-2xl font-bold font-viminalis">Adicionar Novo Banner</h2>
            
            <form onSubmit={handleCreateHero} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1 bg-gray-50 p-3 rounded border border-gray-200">
                <label className="text-sm font-semibold flex items-center gap-2"><FaUpload /> Arquivo da Imagem *</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setHeroImageFile(e.target.files[0])}
                  className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-200 hover:file:bg-gray-300 cursor-pointer mt-1"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 mt-2">
                <button 
                  type="button" 
                  onClick={() => setIsHeroModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-lfapink text-white rounded-lg hover:brightness-90"
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

export default AdminLayout;