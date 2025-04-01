import Link from "next/link";
import styles from "./Product.module.scss";

type ProductType = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock: number;
};

const ProductView = ({
  data,
  isLoading,
}: {
  data: ProductType[];
  isLoading: boolean;
}) => {
  return (
    <div className={styles.product}>
      <div className={styles.product__content}>
        <h1 className={styles.product__title}>Product Page</h1>

        {/* Ketika data nya tidak ada maka akan menampilkan skeleton */}
        {isLoading ? (
          <div className={styles.product__content__skeleton}>
            <div className={styles.product__content__skeleton__image} />
            <div className={styles.product__content__skeleton__name} />
            <div className={styles.product__content__skeleton__category} />
            <div className={styles.product__content__skeleton__price} />
          </div>
        ) : data.length > 0 ? (
          <>
            {data.map((product) => (
              <Link
                href={`/products/${product.id}`}
                key={product.id}
                className={styles.product__content__item}
              >
                <div className={styles.product__content__item__image}>
                  <img
                    src={product.image || "/placeholder.png"}
                    alt={product.name}
                    className={styles.product__content__item__image__img}
                  />
                </div>
                <h4 className={styles.product__content__item__name}>
                  {product.name}
                </h4>
                <p className={styles.product__content__item__category}>
                  {product.category}
                </p>
                <p className={styles.product__content__item__price}>
                  {product.price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </p>
              </Link>
            ))}
          </>
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default ProductView;
