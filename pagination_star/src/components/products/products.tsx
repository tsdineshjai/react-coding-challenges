import React from "react";
import styles from "./products.module.css";
import { Pagination } from "../pagination";

function Products() {
	const [products, setProducts] = React.useState();
	const [page, setPage] = React.useState(1);
	const [total, setTotal] = React.useState(0);

	React.useEffect(() => {
		getData();
		async function getData() {
			try {
				const response = await fetch(
					`https://dummyjson.com/products?limit=10&skip=${
						page == 1 ? 0 : page * 10
					}`
				);
				const data = await response.json();
				const fetchedData = data.products;
				setProducts(fetchedData);
				setTotal((prev) => prev + data.total);
			} catch (err) {
				console.log(err);
			}
		}
	}, [page]);

	return (
		<section className={styles.container}>
			<section className={styles.productsection}>
				{products &&
					products.map((product) => {
						return (
							<section key={product.id} className={styles.product}>
								<p>{product.title}</p>

								<img
									src={product.images[0]}
									alt="product image"
									height={75}
									width={75}
								/>
							</section>
						);
					})}
			</section>

			<Pagination
				products={products}
				setProducts={setProducts}
				setPage={setPage}
				page={page}
				total={total}
			/>
		</section>
	);
}

export default Products;
