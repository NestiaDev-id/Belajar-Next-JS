import ProductView from "@/views/products";

type ProductType = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock: number;
};

const ProductPage = (props: { products: ProductType[] }) => {
  const { products } = props;
  return (
    <div>
      {/* Mengirimkan satu parameter ke ProductView */}
      <ProductView data={products || []} isLoading={false} />
    </div>
  );
};

export default ProductPage;

// Static site generation
export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/product");
  const response = await res.json();
  // console.log(response.data);
  return {
    props: {
      products: response.data || [], // Data produk yang diambil dari API
    }, // Will be passed to the page component as props
  };
}
