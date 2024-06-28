import { useState } from "react";
import "./App.css";
import useDebounce from "./hooks/useDebounce";

const url = "https://jsonplaceholder.typicode.com/todos/2";
function App() {
	const [posts, setPosts] = useState([]);

	async function fetchData() {
		const response = await fetch(url);
		const data = await response.json();
		console.log(data);
		setPosts(() => {
			return [data];
		});
	}
	const debouncedFetchFn = useDebounce(fetchData, 6000);

	return (
		<>
			<button onClick={debouncedFetchFn}>Click</button>

			{!!posts &&
				posts.map((post) => (
					<ul key={post.id}>
						<li>{post.title}</li>
					</ul>
				))}
		</>
	);
}

export default App;
