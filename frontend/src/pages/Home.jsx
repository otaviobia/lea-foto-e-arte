import ProductCarousel from "../components/ProductCarousel.jsx"
import Testimonies from "../components/Testimonies.jsx";
import CategoryCarousel from "../components/CategoryCarousel.jsx";
import Hero from "../components/Hero.jsx";
import Container from "../components/Container.jsx";
import { depoimentos } from "../assets/mock.js";
import { Link } from "react-router";
import {useState, useEffect} from "react";
import FAQ from "../components/FAQ.jsx";


function Home() {
  const [heros, setHeros] = useState([]);
  const [destaques, setDestaques] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch(`http://localhost:3000/api/heros/ativos`).then(res => res.json()),
      fetch(`http://localhost:3000/api/categorias/destaques`).then(res => res.json())
    ])
    .then(([heroData, catData]) => {
      setHeros(heroData.heros || []);
      setDestaques(catData.categorias || []);
    })
    .catch(console.error);
  }, []);

  return (
    <main className="w-full">
      <Hero heros={heros}/>

      <section className="w-full bg-white py-8">
        <Container>
          <h2 className="text-center font-viminalis text-4xl pb-4">Compre por tema</h2>
          <CategoryCarousel/>
          <div className="w-full flex justify-center mt-2">
            <Link className="bg-lfagreen text-white font-viminalis uppercase py-2 px-4 rounded-xl text-md" to="/comprar-por-tema">Ver todos os temas</Link>
          </div>
        </Container>
      </section>

      <section className="w-full bg-lfapink py-12">
        <Container>
          <h2 className="text-center text-white font-winterfun text-6xl">Depoimentos</h2>
          <Testimonies testimonies={depoimentos}/>
        </Container>
      </section>

      {destaques.map((destaque) => (
        <section key={destaque.id} className="w-full bg-white py-4">
          <Container>
            <h2 className="text-center font-viminalis text-4xl pb-4">
              {destaque.name}
            </h2>
            <ProductCarousel produtos={destaque.products || []} />
          </Container>
        </section>
      ))}

      <section className="w-full bg-white py-8">
        <Container>
          <FAQ />
        </Container>
      </section>
    </main>
  )
}

export default Home
