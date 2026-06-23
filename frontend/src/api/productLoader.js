export const productLoader = async ({ params }) => {
  const response = await fetch(`http://localhost:3000/api/produtos/${params.productSlug}`);

  if (response.status === 404) {
    throw new Response("Not Found", { status: 404 });
  }

  const { produto } = await response.json();

  const categoriaSlug = produto.category?.slug;
  let produtosDaCategoria = [];
  if (categoriaSlug) {
    const catRes = await fetch(`http://localhost:3000/api/produtos/categoria/${categoriaSlug}`);
    if (catRes.ok) {
      const data = await catRes.json();
      produtosDaCategoria = data.produtos.filter((p) => p.id !== produto.id);
    }
  }

  return { produto, produtosDaCategoria };
};