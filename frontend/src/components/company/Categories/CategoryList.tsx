/** @format */

import CategoryItem from "./CategoryItem";

/** @format */
interface Category {
  id: string;
  name: string;
  company_id: string;
  created_at: string;
}

interface Props {
  categories: Category[];
  loading: boolean;
  onDelete: (id: string) => void;
}

const CategoryList = ({ categories, loading, onDelete }: Props) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Kategoriler</h3>
      {loading ? (
        <p>Yükleniyor...</p>
      ) : categories.length === 0 ? (
        <p>Henüz kategori yok.</p>
      ) : (
        <ul className="space-y-2">
          {categories.map((cat) => (
            <CategoryItem key={cat.id} category={cat} onDelete={onDelete} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryList;
