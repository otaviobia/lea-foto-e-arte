import ProductCarousel from "./components/ProductCarousel"
import Testimonies from "./components/Testimonies";
import CategoryCarousel from "./components/CategoryCarousel.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Hero from "./components/Hero.jsx";
import { produtos, depoimentos, images, categorias } from "./assets/mock.js";

function App() {
  return (
    <main className="w-full">
      <Header />
      <Hero images={images}/>

      <section className="w-full bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductCarousel produtos={produtos}/>
        </div>
      </section>

      <section className="w-full bg-lfapink py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-white font-winterfun text-6xl">Depoimentos</h2>
          <Testimonies testimonies={depoimentos}/>
        </div>
      </section>

      <section className="w-full bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-viminalis text-4xl font-bold pb-4">Compre por tema</h2>
          <CategoryCarousel categories={categorias} />
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default App
