import { useState } from "react";

import "./App.css";
import { useEffect } from "react";
import { Post } from "./components/post";

function App() {
	const [post, setPost] = useState();
	const [id, setId] = useState(1);

	useEffect(() => {
		async function fetchPosts() {
			const response = await fetch(
				`https://jsonplaceholder.typicode.com/todos/${id}`
			);

			const data = await response.json();

			setPost(data);
		}
		fetchPosts();
	}, [id]);

	const handleIdChange = (e) => {
		setId(e.target.value);
	};

	return (
		<>
			<Post handleIdChange={handleIdChange} post={post} id={id} />
		</>
	);
}

export default App;
