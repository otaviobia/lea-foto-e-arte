export const productLoader = async ({ params }) => {
  const response = await fetch(`https://api.yoursite.com/products/${params.productId}`);
  
  if (response.status === 404) {
    throw new Response("Not Found", { status: 404 });
  }
  
  return response.json();
};