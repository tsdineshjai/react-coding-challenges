import { useState } from "react";

import "./App.css";

function App() {
	const [items, setItems] = useState([
		"apple",
		"banana",
		"dragon fruit",
		"kiwi",
		"jamun fruit",
	]);

	function handleShuffle() {
		let shuffledItems = [];

		while (shuffledItems.length < items.length) {
			const randomIndex = Math.floor(Math.random() * items.length);
			const randomValue = items[randomIndex];
			if (!shuffledItems.includes(randomValue)) {
				shuffledItems.push(randomValue);
			} else {
				continue;
			}
		}
		setItems(shuffledItems);
	}

	return (
		<section>
			<ul>
				{items.map((item, i) => (
					<li key={item + i}>{item}</li>
				))}
			</ul>

			<button className=".shufflebtn" onClick={handleShuffle}>Shuffle Items</button>
		</section>
	);
}

export default App;
