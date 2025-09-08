/** @format */
interface Category {
  id: string;
  name: string;
  company_id: string;
  created_at: string;
}

interface Props {
  category: Category;
  onDelete: (id: string) => void;
}

const CategoryItem = ({ category, onDelete }: Props) => {
  return (
    <li className="bg-white/20 px-3 py-2 rounded flex justify-between">
      <span>{category.name}</span>
      <span className="text-xs text-gray-300">
        {new Date(category.created_at).toLocaleDateString()}
      </span>
      <button
          onClick={() => onDelete(category.id)}
          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
        >
          Sil
        </button>
    </li>
  );
};

export default CategoryItem;
