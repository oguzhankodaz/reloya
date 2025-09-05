/** @format */
import { useEffect, useState } from "react";
import axios from "axios";
import AddCategoryForm from "../../../components/company/Categories/AddCategoryForm";
import CategoryList from "../../../components/company/Categories/CategoryList";
import AddProductForm from "../../../components/company/Products/AddProductForm";

interface Category {
  id: number;
  name: string;
  company_id: string;
  created_at: string;
}

const ServicesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"category" | "product">(
    "category"
  );

  // İlk açılışta kategorileri çek
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const api = import.meta.env.VITE_API_URL;
        const res = await axios.get(`${api}/companies/categories`, {
          withCredentials: true,
        });
        setCategories(res.data.categories);
      } catch (err) {
        console.error("Kategori listesi alınamadı:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Yeni kategori eklendiğinde state’i güncelle
  const handleAddCategory = (newCategory: Category) => {
    setCategories((prev) => [newCategory, ...prev]);
  };

  return (
    <div className="bg-white/10 p-6 rounded-lg text-white shadow w-full max-w-lg">
      <h2 className="text-xl font-bold mb-4">Hizmetlerim</h2>

      {/* TAB Butonları */}
      <div className="flex gap-4 mt-6 mb-6">
        <button
          onClick={() => setActiveTab("category")}
          className={`flex-1 px-6 py-3 rounded-xl font-semibold shadow-md transition-transform transform hover:scale-105 ${
            activeTab === "category"
              ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white"
              : "bg-white/20 text-gray-200 hover:bg-white/30"
          }`}
        >
          📂 Kategori İşlemleri
        </button>

        <button
          onClick={() => setActiveTab("product")}
          className={`flex-1 px-6 py-3 rounded-xl font-semibold shadow-md transition-transform transform hover:scale-105 ${
            activeTab === "product"
              ? "bg-gradient-to-r from-blue-400 to-indigo-500 text-white"
              : "bg-white/20 text-gray-200 hover:bg-white/30"
          }`}
        >
          🛍️ Ürün İşlemleri
        </button>
      </div>

      {/* İçerik */}
      {activeTab === "category" && (
        <>
          <AddCategoryForm onAddCategory={handleAddCategory} />
          <CategoryList categories={categories} loading={loading} />
        </>
      )}

      {activeTab === "product" && (
        <>
          <AddProductForm categories={categories} />
         
        </>
      )}
    </div>
  );
};

export default ServicesPage;
