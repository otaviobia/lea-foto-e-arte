import { useParams } from 'react-router';
import Container from '../components/Container';
import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

function Produtos() {
  const params = useParams();
  const [produtoCat, setprodutoCat] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/produtos/categoria/` + params.category)
      .then(res => res.json())
      .then(data => setprodutoCat(data.produtos))
      .catch(console.error);
  }, [params]);

  const [categoria, setCategoria] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/categorias/` + params.category)
      .then(res => res.json())
      .then(data => setCategoria(data.categoria))
      .catch(console.error);
  }, [params]);

  return (
    <Container className="p-4 min-h-[67vh]">
      <h2 className="font-viminalis text-4xl text-center">
        Produtos de {categoria.name}
      </h2>
      {produtoCat.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {produtoCat.map((p, id) => (
            <ProductCard
              key={id}
              imageSrc={p.images[0]}
              title={p.title}
              price={p.price}
              productSlug={p.slug}
            />
          ))}
        </div>
      ) : (
        <div className="text-center flex flex-col h-60 justify-center items-center">
          <img
            className="w-16"
            src="/images/borboleta.png"
            alt="Imagem de erro"
          />
          <h1 className="font-viminalis">
            Ainda não temos produtos com esse tema!
          </h1>
        </div>
      )}
    </Container>
  );
}

export default Produtos;
