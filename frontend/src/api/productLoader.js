export const productLoader = async ({ params }) => {
  const response = await fetch(`http://localhost:3000/api/produtos/${params.productSlug}`);
  
  if (response.status === 404) {
    throw new Response("Not Found", { status: 404 });
  }
  
  return response.json();
};