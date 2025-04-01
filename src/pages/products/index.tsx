import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ProductView from "../../views/products/index";
import useSWR from "swr";

// Fetcher function untuk SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

function ProductPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { push } = useRouter();

  // Redirect ke halaman login jika belum login
  useEffect(() => {
    if (!isLogin) {
      push("/auth/login");
    }
  }, [isLogin, push]);

  // Menggunakan SWR untuk mengambil data produk
  const { data, error, isLoading } = useSWR("/api/product", fetcher);

  if (error) {
    return <div>Error loading products.</div>;
  }

  return (
    <div>
      {/* Mengirimkan satu parameter ke ProductView */}
      <ProductView data={data?.data || []} isLoading={isLoading} />
    </div>
  );
}

export default ProductPage;
