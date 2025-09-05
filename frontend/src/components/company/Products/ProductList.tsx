/** @format */

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
}: {
  products: Product[];
  loading: boolean;
}) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Ürünler</h3>
      {loading ? (
        <p>Ürünler yükleniyor...</p>
      ) : products.length === 0 ? (
        <p>Henüz ürün yok.</p>
      ) : (
        <ul className="space-y-2">
          {products.map((p) => (
            <ProductItem key={p.id} product ={p}></ProductItem>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
