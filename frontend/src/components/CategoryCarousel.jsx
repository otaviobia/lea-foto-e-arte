import { Swiper, SwiperSlide } from 'swiper/react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router';

function CategoryCarousel() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/categorias')
      .then(res => res.json())
      .then(data => setCategories(data.categorias))
      .catch(console.error);
  }, []);

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
      {categories.map((c, id) => (
        <SwiperSlide key={id}>
          <Link to={`/produtos/${c.slug}`}>
            <img
              className="aspect-square rounded-full pb-1"
              src={c.image}
              alt={c.name}
            />
            <p className="text-2xl font-viminalis text-center">{c.name}</p>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default CategoryCarousel;
