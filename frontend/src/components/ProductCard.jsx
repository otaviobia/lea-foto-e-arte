function ProductCard({imageSrc, title, price, productLink}) {
  return (
    <a className="w-[40%] flex flex-col items-center" href={productLink}>
        <img className="w-full aspect-square rounded-lg pb-2" src={imageSrc} alt={`Foto de ${title}`}></img>
        <h2>{title}</h2>
        <p className="font-bold text-lfapink">{price}</p>
    </a>
  )
}

export default ProductCard
