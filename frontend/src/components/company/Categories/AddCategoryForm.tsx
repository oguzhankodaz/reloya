/** @format */
import { useState } from "react";
import axios from "axios";

interface Props {
  onAddCategory: (newCategory: any) => void;
}

const AddCategoryForm = ({ onAddCategory }: Props) => {
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      const api = import.meta.env.VITE_API_URL;
      const res = await axios.post(
        `${api}/companies/categories`,
        { name },
        { withCredentials: true }
      );

      const newCategory = res.data.category;
      onAddCategory(newCategory); // parent’a haber veriyoruz
      setName("");
    } catch (error) {
      console.error("Kategori eklenemedi:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/10 p-4 rounded-lg mb-4 shadow"
    >
      <h3 className="text-lg font-semibold mb-2">Kategori Ekle</h3>
      <div className="flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Kategori adı"
          className="flex-1 px-3 py-2 rounded bg-white/20 text-white placeholder-gray-300 focus:outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 rounded hover:bg-green-600"
        >
          Ekle
        </button>
      </div>
    </form>
  );
};

export default AddCategoryForm;
