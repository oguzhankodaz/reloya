/** @format */

import { useState } from "react";
import ProductItem from "./ProductItem";

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

const ProductList = ({
  products,
  loading,
  onDelete,
}: {
  products: Product[];
  loading: boolean;
  onDelete: (id: string) => void;
}) => {
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Ürünler</h3>

      {/* Search input */}
      <input
        type="text"
        placeholder="Ürün ara..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      {loading ? (
        <p>Ürünler yükleniyor...</p>
      ) : products.length === 0 ? (
        <p>Henüz ürün yok.</p>
      ) : (
        <ul className="space-y-2">
          {filteredProducts.map((p) => (
            <ProductItem key={p.id} product={p} onDelete={onDelete}></ProductItem>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
