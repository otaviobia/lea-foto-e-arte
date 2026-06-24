import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import Container from '../components/Container';
import ProductCard from '../components/ProductCard';

function BuscaProdutos() {
  const { query } = useParams();
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState(query || '');

  useEffect(() => {
    if (!query) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInputValue(query);
    setLoading(true);
    fetch(
      `http://localhost:3000/api/produtos/busca/${encodeURIComponent(query)}`
    )
      .then(res => res.json())
      .then(data => setProdutos(data.produtos || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [query]);

  const handleSearch = e => {
    e.preventDefault();
    const q = inputValue.trim();
    if (!q) return;
    navigate(`/busca/${encodeURIComponent(q)}`);
  };

  return (
    <Container className="p-4 min-h-[67vh]">
      {/* Barra de busca na própria página */}
      <form
        onSubmit={handleSearch}
        className="flex gap-2 max-w-lg mx-auto mb-8 mt-2"
      >
        <div className="relative flex-1">
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="Buscar produtos..."
            className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-full pl-4 pr-10 py-2.5 outline-none focus:border-lfapink transition-colors"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-lfapink transition-colors"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>
      </form>

      <h2 className="font-viminalis text-4xl text-center mb-6">
        Resultados para "{query}"
      </h2>

      {loading ? (
        <div className="text-center flex flex-col h-60 justify-center items-center">
          <p className="font-viminalis text-gray-400">Buscando...</p>
        </div>
      ) : produtos.length > 0 ? (
        <>
          <p className="text-sm text-gray-400 text-center mb-4">
            {produtos.length} produto{produtos.length !== 1 ? 's' : ''}{' '}
            encontrado{produtos.length !== 1 ? 's' : ''}
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {produtos.map(p => (
              <ProductCard
                key={p.id}
                imageSrc={p.images[0]}
                title={p.title}
                price={p.price}
                productSlug={p.slug}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center flex flex-col h-60 justify-center items-center">
          <img
            className="w-16"
            src="/images/borboleta.png"
            alt="Sem resultados"
          />
          <h1 className="font-viminalis">
            Nenhum produto encontrado para "{query}"
          </h1>
        </div>
      )}
    </Container>
  );
}

export default BuscaProdutos;
