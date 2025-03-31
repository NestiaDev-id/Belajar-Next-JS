import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

// Tipe untuk produk individual
type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock: number;
};

// Tipe untuk respons API
type ProductResponse = {
  status: boolean;
  statusCode: number;
  data: Product[];
};

function ProductPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const { push } = useRouter();

  useEffect(() => {
    // Redirect ke halaman login jika belum login
    if (!isLogin) {
      push("/auth/login");
    }
  }, [isLogin, push]);

  useEffect(() => {
    // Fetch data produk dari API
    fetch("/api/product")
      .then((res) => res.json())
      .then((response: ProductResponse) => {
        console.log(response);
        if (response.status) {
          setProducts(response.data); // Simpan data produk ke state
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div>
      <h1>Product Page</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductPage;
