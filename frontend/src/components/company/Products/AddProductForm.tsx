/** @format */

import axios from "axios";

const AddProductForm = ({ categories }: { categories: any[] }) => {
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
      await axios.post(`${api}/categories/products`, payload, {
        withCredentials: true,
      });

      form.reset(); //
    } catch (err) {
      console.error("Ürün eklenemedi:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/10 p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2">Ürün Ekle</h3>

      <div className="flex flex-col gap-3 mb-3">
        <select
          name="category_id"
          className="px-3 py-2 rounded bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          defaultValue=""
        >
          <option value="" disabled className="bg-gray-800 text-gray-300">
            Kategori Seçin
          </option>
          {categories.map((cat) => (
            <option
              key={cat.id}
              value={cat.id}
              className="bg-gray-800 text-white"
            >
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="name"
          placeholder="Ürün adı"
          className="px-3 py-2 rounded bg-white/20 text-white placeholder-gray-300 focus:outline-none"
        />
        <input
          type="number"
          name="price"
          placeholder="Fiyat"
          className="px-3 py-2 rounded bg-white/20 text-white placeholder-gray-300 focus:outline-none"
        />
        <input
          type="number"
          name="points_to_buy"
          placeholder="Satın Almak İçin Gerekli Puan"
          className="px-3 py-2 rounded bg-white/20 text-white placeholder-gray-300 focus:outline-none"
        />
        <input
          type="number"
          name="points_on_sell"
          placeholder="Satılınca Verilecek Puan"
          className="px-3 py-2 rounded bg-white/20 text-white placeholder-gray-300 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
      >
        Ekle
      </button>
    </form>
  );
};

export default AddProductForm;
