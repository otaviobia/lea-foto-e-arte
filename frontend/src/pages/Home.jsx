import ProductCarousel from "../components/ProductCarousel.jsx"
import Testimonies from "../components/Testimonies.jsx";
import CategoryCarousel from "../components/CategoryCarousel.jsx";
import Hero from "../components/Hero.jsx";
import Container from "../components/Container.jsx";
import { produtos, depoimentos, images, categorias } from "../assets/mock.js";

function Home() {
  return (
    <main className="w-full">
      <Hero images={images}/>

      <section className="w-full bg-white py-12">
        <Container>
          <ProductCarousel produtos={produtos}/>
        </Container>
      </section>

      <section className="w-full bg-lfapink py-12">
        <Container>
          <h2 className="text-center text-white font-winterfun text-6xl">Depoimentos</h2>
          <Testimonies testimonies={depoimentos}/>
        </Container>
      </section>

      <section className="w-full bg-white py-12">
        <Container>
          <h2 className="text-center font-viminalis text-4xl font-bold pb-4">Compre por tema</h2>
          <CategoryCarousel categories={categorias} />
        </Container>
      </section>
    </main>
  )
}

export default Home
