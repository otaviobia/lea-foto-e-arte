import { useLoaderData } from 'react-router';
import Container from '../components/Container';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

export default function Produto() {
  const { produto } = useLoaderData();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const mensagemWhatsapp = encodeURIComponent(`Tenho interesse no produto ${produto.title}`);
  const linkWhatsapp = `https://wa.me/5516997158260?text=${mensagemWhatsapp}`;

  return (
    <Container>
      <section className="w-full flex flex-col lg:flex-row gap-5 p-4">
        <div className="flex flex-col gap-3 lg:w-1/2 min-w-0">
          {/* Swiper Principal (Imagem grande) */}
          <Swiper
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="w-full"
          >
            {produto.images.map((url, index) => (
              <SwiperSlide key={index}>
                <img 
                  className="w-full aspect-square object-cover rounded-4xl" 
                  src={url} 
                  alt={`Imagem do produto ${index + 1}`} 
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Swiper de Thumbnails (Miniaturas) */}
          {produto.images.length > 1 && (
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="w-full thumbs-carousel"
            >
              {produto.images.map((url, index) => (
                <SwiperSlide key={`thumb-${index}`}>
                  <img 
                    className="w-full aspect-square object-cover rounded-xl cursor-pointer hover:opacity-80 transition-opacity" 
                    src={url} 
                    alt={`Miniatura ${index + 1}`} 
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
        <div className="flex flex-col gap-5 lg:w-1/2">
          <div className="flex flex-col gap-5">
            <h2 className='font-viminalis text-2xl'>{produto.title}</h2>
            <p className='font-viminalis text-lfapink text-2xl'>R$ {produto.price.toString().replace('.', ',')}</p>
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