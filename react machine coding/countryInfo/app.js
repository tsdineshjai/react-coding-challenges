import React from "react";
import "./styles.css";

export default function App() {
	const [country, setCountry] = React.useState("");
	const [countryInfo, setCountryInfo] = React.useState([]);

	React.useEffect(() => {
		async function fetchCountryInfo() {
			try {
				const response = await fetch(
					`https://restcountries.com/v3.1/name/${country}`
				);

				const data = await response.json();

				console.log(data);
			} catch (e) {
				console.error(`an error has occured with message: ${e.message}`);
			}
		}

		fetchCountryInfo();
	}, [country]);

	return <div className="App"></div>;
}
