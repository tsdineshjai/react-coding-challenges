import styles from "./star.module.css";
import React from "react";

const limit = 5;
function Star() {
	const [rating, setRating] = React.useState(0);
	// i < rating ? "★" : "☆";
	return (
		<div className={styles.star}>
			{[...Array(limit)].map((_, i) => (
				<span onClick={() => setRating(i)} key={i}>
					{i <= rating ? "★" : "☆"}
				</span>
			))}
		</div>
	);
}

export default Star;
