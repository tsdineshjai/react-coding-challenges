import React from "react";
import "./App.css";
import axios from "axios";

function App() {
	const [details, userDetails] = React.useState({
		name: "",
		email: "",
	});

	function handleChange(e) {
		userDetails({
			...details,
			[e.target.name]: e.target.value,
		});
	}

	function handleSubmit(e) {
		e.preventDefault();

		// fetch("https://jsonplaceholder.typicode.com/posts", {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// 	body: JSON.stringify({
		// 		userId: 1,
		// 		id: 151,
		// 		title: details.name,
		// 		body: details.email,
		// 	}),
		// });

		axios
			.post(
				"https://jsonplaceholder.typicode.com/posts",
				{ userId: 1, id: 151, title: details.name, body: details.email },
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			.then((response) => {
				console.log(response);
				if (response.status == 201) {
					console.log(`the post request is successful`);
				}
			})
			.catch((error) => console.error(error));

		// window.alert(JSON.stringify(details));
	}

	return (
		<div className="container">
			<form onSubmit={handleSubmit}>
				<label htmlFor="email">Email:</label>
				<input
					type="email"
					name="email"
					id="email"
					value={details.email}
					onChange={handleChange}
				/>

				<label htmlFor="name">Name:</label>
				<input
					type="text"
					name="name"
					id="name"
					value={details.name}
					onChange={handleChange}
				/>

				<button>Submit</button>
			</form>
		</div>
	);
}

export default App;
