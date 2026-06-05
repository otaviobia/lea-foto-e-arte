function ProductCard({imageSrc, title, price, productLink}) {
  return (
  <a className="w-full flex flex-col items-center" href={productLink}>
    <img className="w-full aspect-square rounded-2xl pb-2" src={imageSrc} alt={`Foto de ${title}`}></img>
    <h2 className="w-full text-center md:text-left md:text-2xl font-viminalis">{title}</h2>
    <p className="w-full text-center md:text-left md:text-2xl font-bold font-viminalis text-lfapink">{price}</p>
  </a>
  )
}

export default ProductCard
