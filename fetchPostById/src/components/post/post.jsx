import "./post.css";

/* eslint-disable react/prop-types */
function Post({ handleIdChange, post, id }) {
	return (
		<>
			<section className="post">
				<input
					type="text"
					value={id}
					onChange={handleIdChange}
					placeholder="Enter a ID"
				/>
				<div>{!!post && post.title}</div>
			</section>
		</>
	);
}

export default Post;
