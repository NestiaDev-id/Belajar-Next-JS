import { useRouter } from "next/router";
import React from "react";

export default function shopPage() {
  const { query } = useRouter();
  const slugArray = Array.isArray(query.slug) ? query.slug : [];

  return (
    <div>
      <h1>Shop Page</h1>
      <p>
        Shop ID: {slugArray[0]} - {slugArray[1]}
      </p>
    </div>
  );
}
