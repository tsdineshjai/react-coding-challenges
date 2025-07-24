import React, { useCallback } from "react";

import "./App.css";

const api = "https://jsonplaceholder.typicode.com/posts";

type Post = {
	id: number;
	title: string;
};

export default function App() {
	const [data, setData] = React.useState<Post[]>([]);
	const [loading, setLoading] = React.useState(false);
	const [filter, setFilter] = React.useState("");
	const [refinedResults, setRefinedResults] = React.useState<Post[]>([]);

	function handleFilter(e: React.ChangeEvent<HTMLInputElement>) {
		setFilter(() => e.target.value);

		const filteredData = [...data].filter((item) =>
			item.title.includes(filter)
		);

		setRefinedResults(filteredData);
	}

	function makeActive(e: React.MouseEvent<HTMLAnchorElement>) {
		const anchorList = document.querySelectorAll("a[role='page']");

		console.log(anchorList);

		anchorList.forEach((anchorItem) => {
			if (anchorItem == e.target) {
				anchorItem.classList.add("active");
			} else {
				if (anchorItem.classList.contains("active")) {
					anchorItem.classList.remove("active");
				}
			}
		});
	}
	const noOfPages = Math.ceil(data.length / 10);

	const handlePageClickCallback = useCallback(
		(e: React.MouseEvent<HTMLAnchorElement> | null, number: number = 1) => {
			if (e) e.preventDefault();
			const newResults = [...data].slice(number * 10 - 10, number * 10);
			setRefinedResults(newResults);
		},
		[data]
	);

	React.useEffect(() => {
		async function fetchData() {
			try {
				setLoading(true);
				await new Promise((resolve) => setTimeout(resolve, 3000));
				const response = await fetch(api);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const responseData: Post[] = await response.json();
				setData(responseData);
			} catch (e: unknown) {
				if (e instanceof Error) {
					console.error("Error fetching data:", e.message);
				} else {
					console.error("An unknown error occurred:", e);
				}
			} finally {
				setLoading(false);
			}
		}
		fetchData();
	}, []);

	React.useEffect(() => {
		handlePageClickCallback(null, 1);
		const anchorList = document.querySelectorAll("a[role='page']");
		anchorList[0]?.classList.add("active");
	}, [handlePageClickCallback]);

	if (loading) {
		return <div>Loading....</div>;
	}

	return (
		<div className="App">
			<input
				type="text"
				name="filter"
				id="filter"
				value={filter}
				onChange={handleFilter}
			/>

			{refinedResults?.map((item) => (
				<Data key={item.id} childItem={item} />
			))}

			<div className="pagesContainer">
				{Array.from({ length: noOfPages }).map((_, i) => (
					<a
						role="page"
						key={"Sa-" + i}
						href="javascript:void(0)"
						onClick={(e) => {
							handlePageClickCallback(e, ++i);
							makeActive(e);
						}}
					>
						{i + 1}
					</a>
				))}
			</div>
		</div>
	);
}

type DataProps = {
	childItem: Post;
};

function Data({ childItem }: DataProps) {
	const { title } = childItem;
	return (
		<div>
			<a href="#">{title}</a>
		</div>
	);
}
