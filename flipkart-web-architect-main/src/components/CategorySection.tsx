
import { Link } from "react-router-dom";
import { Category } from "@/types";

interface CategorySectionProps {
  categories: Category[];
}

const CategorySection: React.FC<CategorySectionProps> = ({ categories }) => {
  return (
    <section className="py-6 bg-white shadow-sm">
      <div className="flipkart-container">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              to={`/products?category=${category.id}`}
              key={category.id}
              className="flex flex-col items-center justify-center p-2 hover:text-flipkart-blue transition-colors"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden mb-2">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm font-medium text-center">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
