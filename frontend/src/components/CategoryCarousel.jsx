import { Swiper, SwiperSlide } from "swiper/react"

function CategoryCarousel ({ categories }) {
  return (
    <Swiper 
      spaceBetween={30}
      loop={true}
      slidesPerView={3}
      breakpoints={{
        768: {
          slidesPerView: 4,
        },
        1024: {
          slidesPerView: 6,
        },
      }}
    >
      {categories.map((c, id) =>
        <SwiperSlide key={id}>
          <a href="trocaraqui.html">
            <img className="aspect-square rounded-full pb-1" src={c.image} alt={c.name} />
            <p className="text-2xl font-viminalis text-center">{c.name}</p>
          </a>
        </SwiperSlide>
      )}
    </Swiper>
  )
}

export default CategoryCarousel