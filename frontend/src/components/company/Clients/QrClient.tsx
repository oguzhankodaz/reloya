/** @format */
import { useEffect, useState } from "react";
import axios from "axios";

import ClientProductList from "../Products/ClientProductList";
import ProductCartList from "../Products/ProductCartList";

interface User {
  id: string;
  name: string;
  email: string;
  // backend’den dönen diğer alanlar...
}

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

const QrClient = ({ id }: { id: string }) => {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const api = import.meta.env.VITE_API_URL;
        const res = await axios.get(`${api}/users/${id}`, {
          withCredentials: true, // ✅ cookie taşısın
        });
        setUser(res.data);
      } catch (err) {
        console.error("Kullanıcı bulunamadı:", err);
      }
    };
    fetchUser();
  }, [id]);

  if (!user) return <p>Yükleniyor...</p>;
  //21f3fd74-b9c1-41a0-b2e9-a59413388b8f

  return (
    <div className=" text-left bg-white border border-gray-200 rounded-lg shadow p-4 sm:p-6 w-full max-w-md mx-auto">
    <h3 className="text-xl font-bold mb-3 text-indigo-600">
      👤 Kullanıcı Bilgileri
    </h3>
  
    <div className="space-y-2 text-gray-700 text-sm sm:text-base">
      <p>
        <span className="font-semibold text-gray-900">👨 Ad:</span>{" "}
        <span className="text-green-600">{user.name}</span>
      </p>
      <p>
        <span className="font-semibold text-gray-900">📧 Email:</span>{" "}
        <span className="text-blue-600 break-all">{user.email}</span>
      </p>
  
     
  
      {/* Ürün listesi kutusu */}
      <div className="mt-6">
        <ClientProductList
          products={products}
          loading={loadingProducts}
        />
      </div>
      <ProductCartList></ProductCartList>
      <button className="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
        Kaydet
      </button>
    </div>
  </div>
  
  );
};

export default QrClient;
