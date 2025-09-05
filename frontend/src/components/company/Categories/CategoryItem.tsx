/** @format */
interface Category {
  id: number;
  name: string;
  company_id: string;
  created_at: string;
}

interface Props {
  category: Category;
}

const CategoryItem = ({ category }: Props) => {
  return (
    <li className="bg-white/20 px-3 py-2 rounded flex justify-between">
      <span>{category.name}</span>
      <span className="text-xs text-gray-300">
        {new Date(category.created_at).toLocaleDateString()}
      </span>
    </li>
  );
};

export default CategoryItem;
