import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

function Hero({ heros }) {
  return (
    <Swiper
      loop={true}
      modules={[Pagination]}
      pagination={{ clickable: true }}
      style={{
        '--swiper-pagination-color': '#ffffff',
        '--swiper-pagination-bullet-size': '16px',
        '--swiper-pagination-bullet-inactive-color': '#ffffff',
        '--swiper-pagination-bullet-inactive-opacity': '0.4',
      }}
      className="w-full aspect-video lg:aspect-auto"
    >
      {heros.map((hero, id) => (
        <SwiperSlide
          key={id}
          className="h-full w-full aspect-21/9 lg:aspect-32/9"
        >
          <img
            className="block w-full h-full object-cover"
            src={hero.image}
            alt={'Imagem ' + id}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Hero;
