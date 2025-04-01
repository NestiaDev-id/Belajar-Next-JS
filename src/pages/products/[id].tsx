import React, { useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import DetailProduct from "../../views/DetailProduct/index";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function detailProduct() {
  const { query } = useRouter();

  const { data, error, isLoading } = useSWR(
    `/api/product/${query.id}`,
    fetcher
  );

  console.log(data);

  return (
    <div>
      <h1>Detail Product</h1>
      {/* <p>Product ID: {query.id}</p> */}
      <DetailProduct product={data?.data || []} isLoading={isLoading} />
    </div>
  );
}
