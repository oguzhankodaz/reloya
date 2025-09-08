/** @format */

import axios from "axios";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  points_to_buy: number;
  points_on_sell: number;
  category_id: string;
  company_id: string;
  created_at: string;
}

const AddProductForm = ({ categories }: { categories: any[] }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      const api = import.meta.env.VITE_API_URL;
      await axios.delete(`${api}/categories/products/${id}`, {
        withCredentials: true,
      });
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Ürün silinemedi:", error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const api = import.meta.env.VITE_API_URL;
        const res = await axios.get(`${api}/categories/products`, {
          withCredentials: true,
        });

        setProducts(res.data.products);
      } catch (err) {
        console.error("Ürün listesi alınamadı:", err);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name") as string,
      price: Number(formData.get("price")),
      points_to_buy: Number(formData.get("points_to_buy")),
      points_on_sell: Number(formData.get("points_on_sell")),
      categoryId: formData.get("category_id") as string, // ✅ backend ile uyumlu
    };

    if (
      !payload.name ||
      !payload.price ||
      !payload.points_to_buy ||
      !payload.points_on_sell ||
      !payload.categoryId
    ) {
      alert("Lütfen bütün alanları doğru doldurun!");
      return;
    }
    try {
      const api = import.meta.env.VITE_API_URL;
      const res = await axios.post(`${api}/categories/products`, payload, {
        withCredentials: true,
      });
      const newProduct = res.data.product;
      setProducts((prev) => [newProduct, ...prev]);
      form.reset(); //
    } catch (err) {
      console.error("Ürün eklenemedi:", err);
    }
  };

  return (
    <>
      {/* Aç/Kapat butonu */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-6 py-3 rounded-xl font-semibold shadow-md transition-transform transform hover:scale-105 ${
          isOpen
            ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white"
            : "bg-white/20 text-gray-200 hover:bg-white/30"
        }`}
      >
        {isOpen ? "✖ Formu Kapat" : "🛍️ Yeni Ürün Ekle"}
      </button>

      {/* Açılır/Kapanır kutu (animasyonlu) */}
      <div
        className={`transition-all duration-500 overflow-hidden ${
          isOpen ? "max-h-[1000px] opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 p-4 rounded-lg shadow mb-6"
        >
          <h3 className="text-lg font-semibold mb-2">Ürün Ekle</h3>

          <div className="flex flex-col gap-3 mb-3">
            <select
              name="category_id"
              className="px-3 py-2 rounded bg-white/20 text-white"
              defaultValue=""
            >
              <option value="" disabled>
                Kategori Seçin
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id} className="text-black">
                  {cat.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="name"
              placeholder="Ürün adı"
              className="px-3 py-2 rounded bg-white/20 text-white"
            />
            <input
              type="number"
              name="price"
              placeholder="Fiyat"
              className="px-3 py-2 rounded bg-white/20 text-white"
            />
            <input
              type="number"
              name="points_to_buy"
              placeholder="Satın Almak İçin Gerekli Puan"
              className="px-3 py-2 rounded bg-white/20 text-white"
            />
            <input
              type="number"
              name="points_on_sell"
              placeholder="Satılınca Verilecek Puan"
              className="px-3 py-2 rounded bg-white/20 text-white"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
          >
            Ekle
          </button>
        </form>
      </div>

      {/* Ürün listesi */}
      <ProductList
        products={products}
        loading={loadingProducts}
        onDelete={handleDelete}
      ></ProductList>
    </>
  );
};

export default AddProductForm;
