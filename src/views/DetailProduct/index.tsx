import styles from "./DetailProduct.module.scss";

type ProductType = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock: number;
};

export default function DetailProduct({
  product,
  isLoading,
}: {
  product: ProductType;
  isLoading: boolean;
}) {
  return (
    <div className={styles.productDetail}>
      <div className={styles.productDetail__image}>
        <img
          src={product.image || "/placeholder.png"}
          alt={product.name}
          className={styles.productDetail__image__img}
        />
      </div>
      <h4 className={styles.productDetail__name}>{product.name}</h4>
      <p className={styles.productDetail__category}>{product.category}</p>
      <p className={styles.productDetail__price}>
        {product.price &&
          product.price.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}
      </p>
    </div>
  );
}
