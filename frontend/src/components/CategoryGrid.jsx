import { Link } from 'react-router';

function CategoryGrid({ categories }) {
  return (
    <div className="grid grid-cols-3 lg:grid-cols-6 gap-6 p-4">
      {categories.map((c, index) => (
        <div key={c.id || index} className="flex flex-col items-center">
          <Link to={`/categoria/${c.id}`} className="hover:opacity-80 transition-opacity">
            <img
              className="aspect-square w-full rounded-full pb-1 object-cover"
              src={c.image}
              alt={c.name}
              loading="lazy" // ← browser carrega conforme vai aparecendo na tela
            />
            <p className="text-2xl font-viminalis text-center">{c.name}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default CategoryGrid;