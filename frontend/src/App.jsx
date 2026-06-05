import ProductCarousel from "./components/ProductCarousel"

const produtos = [
  {
    imageSrc: "/produtos/topper.webp",
    title: "Toppers Fauna Brasileira",
    price: "R$ 50,00",
    productLink: "https://example.com/topper"
  },
  {
    imageSrc: "/produtos/topper.webp",
    title: "Toppers Fauna Brasileira",
    price: "R$ 50,00",
    productLink: "https://example.com/topper"
  },
  {
    imageSrc: "/produtos/topper.webp",
    title: "Toppers Fauna Brasileira",
    price: "R$ 50,00",
    productLink: "https://example.com/topper"
  },
  {
    imageSrc: "/produtos/topper.webp",
    title: "Toppers Fauna Brasileira",
    price: "R$ 50,00",
    productLink: "https://example.com/topper"
  },
  {
    imageSrc: "/produtos/topper.webp",
    title: "Toppers Fauna Brasileira",
    price: "R$ 50,00",
    productLink: "https://example.com/topper"
  },
  {
    imageSrc: "/produtos/topper.webp",
    title: "Toppers Fauna Brasileira",
    price: "R$ 50,00",
    productLink: "https://example.com/topper"
  },
  {
    imageSrc: "/produtos/topper.webp",
    title: "Toppers Fauna Brasileira",
    price: "R$ 50,00",
    productLink: "https://example.com/topper"
  },
];

function App() {
  return (
    <main className="w-full">
      
      <section className="w-full bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductCarousel produtos={produtos}/>
        </div>
      </section>

      <section className="w-full bg-lfapink py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-white font-winterfun text-6xl">Depoimentos</h2>
        </div>
      </section>

    </main>
  )
}

export default App
