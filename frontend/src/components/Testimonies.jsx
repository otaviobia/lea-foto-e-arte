import { Swiper, SwiperSlide } from 'swiper/react';
import { FaStar } from 'react-icons/fa';
import Container from './Container';

function Testimonies({ testimonies }) {
  return (
    <>
      <div className="w-full overflow-hidden leading-none -mb-1">
        <svg
          viewBox="0 0 1440 60"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-15"
        >
          <path
            d="M0,40 C360,0 1080,80 1440,20 L1440,60 L0,60 Z"
            fill="#F2B3B3"
          />
        </svg>
      </div>

      <section className="w-full bg-lfapink py-12 relative">
        <Container>
          <h2 className="text-center text-white font-winterfun text-6xl">
            Depoimentos
          </h2>
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
            {testimonies.map((t, id) => (
              <SwiperSlide key={id}>
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, starIndex) => (
                    <FaStar
                      key={starIndex}
                      className="text-lfayellow text-4xl"
                    />
                  ))}
                </div>
                <p className="text-justify text-white text-2xl font-viminalis h-54">
                  {t.testimony}
                </p>
                <p className="text-center text-white text-4xl font-viminalis font-bold pt-4">
                  {t.author}
                </p>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>

        <div className="absolute bottom-[-10] right-14 translate-y-1/2">
          <img
            className="w-16 h-16"
            src="/images/borboleta.png"
            alt="Borboleta"
          />
        </div>
      </section>

      <div className="w-full overflow-hidden leading-none -mt-1">
        <svg
          viewBox="0 0 1440 60"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-15"
        >
          <path
            d="M0,20 C360,80 1080,0 1440,40 L1440,0 L0,0 Z"
            fill="#F2B3B3"
          />
        </svg>
      </div>
    </>
  );
}

export default Testimonies;
