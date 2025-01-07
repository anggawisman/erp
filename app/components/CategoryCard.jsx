// components/CategoryCard.jsx
import Link from "next/link";

const CategoryCard = ({ title, subtitle, link }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow min-w-96">
      <h3 className="text-xl font-semibold">{title}</h3>
      <div className="flex flex-row gap-8 items-center justify-between mt-2">
        <p className="text-gray-500 text-sm italic">{subtitle}</p>
        <Link
          href={link}
          className="text-blue-500 text-sm font-medium inline-flex items-center"
        >
          Explore →
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;
