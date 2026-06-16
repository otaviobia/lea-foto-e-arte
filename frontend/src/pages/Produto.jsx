import { useLoaderData } from 'react-router';
import Container from '../components/Container';

export default function Produto() {
  const { produto } = useLoaderData(); 

  const mensagemWhatsapp = encodeURIComponent(`Tenho interesse no produto ${produto.title}`);
  const linkWhatsapp = `https://wa.me/5516997158260?text=${mensagemWhatsapp}`;

  return (
    <Container>
      <section className="w-full flex flex-col lg:flex-row gap-5">
        
        <div className="flex flex-col gap-5">
          {produto.images.map((url) => (
            <img src={url} alt="Imagem do produto" />
          ))}
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            <h2 className='font-viminalis text-2xl'>{produto.title}</h2>
            <p className='font-viminalis text-lfapink text-2xl'>R$ {produto.price}</p>
          </div>
          
          <div className="flex flex-col align-center gap-2 w-full">
            <a className="bg-lfagreen text-white p-4 w-fit rounded-4xl" href={linkWhatsapp} target="_blank" rel="noreferrer">
              COMPRAR PELO WHATSAPP
            </a>
            
            {produto.shopeeLink && (
              <a className="bg-lfapink text-white p-4 w-fit rounded-4xl" href={produto.shopeeLink} target="_blank" rel="noreferrer">
                COMPRAR PELA SHOPEE
              </a>
            )}
          </div>
          
          <div className="font-viminalis text-xl">
            <h2 className='text-lfapink'>Descrição do Produto</h2>
            <p>
              {produto.description}
            </p>
          </div>
        </div>
      </section>
    </Container>
  );
}