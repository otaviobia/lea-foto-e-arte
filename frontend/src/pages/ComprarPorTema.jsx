import { useState, useEffect } from 'react';
import Container from "../components/Container";
import CategoryGrid from "../components/CategoryGrid";

function ComprarPorTema() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/categorias`)
      .then(res => res.json())
      .then(data => setCategorias(data.categorias))
      .catch(console.error);
  }, []);

  return (
    <main>
      <Container className="text-center py-4 min-h-[70vh]">
        <h1 className="font-winterfun text-lfapink text-6xl">Compre por Tema!</h1>
        <h2 className="font-viminalis text-2xl">Escolha o tema perfeito para você e veja todos os nossos produtos!</h2>
        <CategoryGrid categories={categorias} />
      </Container>
    </main>
  );
}

export default ComprarPorTema;