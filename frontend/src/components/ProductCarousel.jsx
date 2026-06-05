import ProductCard from "./ProductCard"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function ProductCarousel({produtos}) {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={2}
      breakpoints={{
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
      }}
    >
      {produtos.map((p, index) =>
        <SwiperSlide>
          <ProductCard key={index} imageSrc={p.imageSrc} title={p.title} price={p.price} productLink={p.productLink}/>
        </SwiperSlide>
      )}
    </Swiper>
  )
}

export default ProductCarousel