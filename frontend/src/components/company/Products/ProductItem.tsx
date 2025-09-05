/** @format */

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

const ProductItem = ({ product }: { product: Product }) => {
  return (
    <li
      key={product.id}
      className="bg-white/20 px-3 py-2 rounded flex justify-between"
    >
      <span>{product.name}</span>

      <span className="text-xs text-gray-300">
        {product.points_to_buy} Puan
      </span>
    </li>
  );
};

export default ProductItem;
