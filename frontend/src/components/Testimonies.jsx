import { Swiper, SwiperSlide } from 'swiper/react';
import { FaStar } from "react-icons/fa";

function Testimonies ({testimonies}) {
  return (
    <Swiper
      spaceBetween={60}
      slidesPerView={1}
      breakpoints={{
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      }}
    >
      {testimonies.map((t, id) =>
        <SwiperSlide key={id}>
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, starIndex) => (
              <FaStar key={starIndex} className="text-lfayellow text-4xl" />
            ))}
          </div>
          <p className='text-justify text-white text-2xl font-viminalis h-54'>{t.testimony}</p>
          <p className='text-center text-white text-4xl font-viminalis font-bold pt-4'>{t.author}</p>
        </SwiperSlide>
      )}
    </Swiper>
  )
}

export default Testimonies