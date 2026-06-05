import ProductCarousel from "./components/ProductCarousel"
import Testimonies from "./components/Testimonies";
import Hero from "./components/Hero.jsx";
import { produtos, depoimentos, images } from "./assets/mock.js";

function App() {
  return (
    <main className="w-full">
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

    </main>
  )
}

export default App
