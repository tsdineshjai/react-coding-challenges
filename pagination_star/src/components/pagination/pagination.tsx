import styles from "./pagination.module.css";

function Pagination({ products, setProducts, setPage, page, total }) {
	function handlePagination(selectedPage: number) {
		setPage(selectedPage);
	}

	const totalPages = 10;

	return (
		<section className={styles.container}>
			<button
				className={styles.buttonPagintion}
				disabled={page <= 1 ? true : false}
				onClick={() => handlePagination(page - 1)}
			>
				{" "}
				{"<--- "}{" "}
			</button>

			{[...Array(totalPages)].map((_, i) => (
				<span
					key={i}
					className={styles.page}
					onClick={() => handlePagination(i + 1)}
					style={{ backgroundColor: page == i + 1 ? "yellow" : "" }}
				>
					{i + 1}
				</span>
			))}

			<button
				className={styles.buttonPagintion}
				disabled={page >= totalPages ? true : false}
				onClick={() => handlePagination(page + 1)}
			>
				{" --->"}
			</button>
		</section>
	);
}

export default Pagination;
