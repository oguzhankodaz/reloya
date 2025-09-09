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

const ClientProductItem = ({
  product,

}: {
  product: Product;
}) => {
  return (
    <li
      className="bg-white/20 px-3 py-2 rounded flex justify-between items-center"
    >
      <span>{product.name}</span>

      <div className="flex items-center gap-4">
        <span className="flex items-center gap-2 text-xs text-gray-300">
          Satın alma için gerekli puan:
          <span className="text-gray-600 font-bold">
            {product.points_to_buy}
          </span>
        </span>

        {/* ✅ Sil butonu */}
        <button
         
          className="px-2 py-1 bg-green-500 text-white rounded hover:bg-red-600 text-xs"
        >
          Ekle
        </button>
      </div>
    </li>
  );
};

export default ClientProductItem;
