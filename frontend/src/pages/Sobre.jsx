import Testimonies from '../components/Testimonies';
import ProductCarousel from '../components/ProductCarousel';
import Container from '../components/Container.jsx';
import { depoimentos } from '../assets/depoimentos.js';
import { useState, useEffect } from 'react';

function Sobre() {
  const [produtoCat, setprodutoCat] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/produtos/categoria/fauna-brasileira`)
      .then(res => res.json())
      .then(data => setprodutoCat(data.produtos))
      .catch(console.error);
  }, []);

  return (
    <main>
      <Container className="flex flex-col-reverse lg:flex-row p-4 gap-8 w-full">
        <div className="lg:w-1/2">
          <h2 className="font-winterfun text-lfapink text-6xl text-center">
            Nossa História
          </h2>
          <div className="font-viminalis text-lg text-justify">
            <h3 className="font-bold text-xl border-b border-gray-300 mb-2 pb-1">
              Como tudo começou
            </h3>
            <p className="pb-3">
              Em 2007, conheci o universo do scrapbook digital e foi paixão à
              primeira vista. Aprendi a usar o Photoshop e comecei a criar
              páginas decoradas para eternizar as fotos do meu filho. No
              aniversário de 2 anos dele, fiz um ímã de geladeira como
              lembrancinha. O que era um passatempo de mãe logo virou trabalho:
              quando me dei conta, já estava criando ímãs para as festas das
              amigas, e depois, para as amigas delas!
            </p>
            <h3 className="font-bold text-xl border-b border-gray-300 mb-2 pb-1">
              A nossa evolução
            </h3>
            <p className="pb-3">
              Em abril de 2009, dei um grande passo e abri minha loja no Elo7.
              Foi a época em que as festas personalizadas começaram a virar
              tendência e, em pouco tempo, o catálogo cresceu com rótulos para
              guloseimas, bandeirinhas, convites e tags.
            </p>
            <h3 className="font-bold text-xl border-b border-gray-300 mb-2 pb-1">
              O que oferecemos hoje
            </h3>
            <p className="pb-3">
              Nossa paixão por criar se expandiu. Hoje, além da papelaria
              completa para festas, também desenvolvo itens para organizar e
              alegrar o seu dia a dia: Agendas; Cadernos; Bloquinhos. Tudo é
              feito com muito carinho e enviado para todo o Brasil.
            </p>
            <p className="font-bold text-xl mb-2">
              Seja muito bem-vinda(o)! Qualquer dúvida ou pedido especial, entre
              em contato. Será um grande prazer atender você e fazer parte dos
              seus momentos felizes!
            </p>
          </div>
          <img
            className="pt-2 ml-auto"
            src="/images/assinatura.png"
            alt="Léa Biagioni"
          />
        </div>
        <img
          className="hidden lg:block w-1/2 object-contain"
          src="/images/sobre-desktop.png"
          alt="Sobre"
        />
        <img
          className="block lg:hidden"
          src="/images/sobre-mobile.png"
          alt="Sobre"
        />
      </Container>
      <Testimonies testimonies={depoimentos} />
      <Container className="py-4">
        <h2 className="text-center py-2 font-viminalis text-2xl lg:text-4xl">
          Monte sua próxima festa com a gente!
        </h2>
        <ProductCarousel produtos={produtoCat} />
      </Container>
    </main>
  );
}

export default Sobre;
