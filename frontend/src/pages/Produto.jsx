import { useLoaderData } from 'react-router';

export default function Produto() {
  const productData = useLoaderData();

  return (
    <div>
      <h1>{productData.name}</h1>
      <p>Price: ${productData.price}</p>
    </div>
  );
}