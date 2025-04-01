import ProductView from "../../views/products/index";

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
      <ProductView data={products || []} isLoading={false} />
    </div>
  );
};

export default ProductPage;

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/product");
  const response = await res.json();
  // console.log(response.data);
  return {
    props: {
      products: response.data || [], // Data produk yang diambil dari API
    }, // Will be passed to the page component as props
  };
}
