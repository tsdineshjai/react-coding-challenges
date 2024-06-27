import { useState } from "react";
import "./App.css";

const list = ["apple", "kiwi", "mango", "grapefruit", "orange"];

function App() {
	const [firstList, setFirstList] = useState([
		{
			item: "apple",
			checked: false,
		},
		{
			item: "avocado",
			checked: false,
		},
		{
			item: "mango",
			checked: false,
		},
	]);
	const [secondList, setSecondList] = useState([
		{
			item: "pineapple",
		},
		{
			item: "orange",
		},
		{
			item: "red grapes",
		},
	]);

	const [selectedIndexes, setSelectedIndexes] = useState([]);

	function handleCheckboxChange(targetItem, e, i) {
		if (e.target.checked) {
			setSelectedIndexes((selectedIndexes) => [...selectedIndexes, i]);
		} else {
			setSelectedIndexes(selectedIndexes.filter((item) => item !== i));
		}
		const udpatedList = firstList.map((item) => {
			if (item.item === targetItem) {
				return {
					...item,
					checked: e.target.checked,
				};
			} else {
				return item;
			}
		});
		setFirstList(udpatedList);
	}

	function handleSwap() {
		let firstListCopy = [...firstList];
		let secondListCopy = [...secondList];

		for (let i = 0; i < selectedIndexes.length; i++) {
			firstListCopy[selectedIndexes[i]] = secondList[selectedIndexes[i]];
			secondListCopy[selectedIndexes[i]] = firstList[selectedIndexes[i]];
		}

		setFirstList(firstListCopy);
		setSecondList(secondListCopy);
	}
	return (
		<section className="group">
      <h3>Swapping</h3>
			<section className="first">
				<div className="listOfItems">
					{firstList.map((item, i) => (
						<section className="item" key={item.item + i}>
							<input
								type="checkbox"
								id={item.item}
								checked={item.checked}
								onChange={(e) => handleCheckboxChange(item.item, e, i)}
							/>
							<label htmlFor={item.item}> {item.item}</label>
						</section>
					))}
				</div>
				<div className="listOfItems ">
					{secondList.map((item, i) => (
						<section className="item secondlist" key={item.item + i + "-key"}>
							<p>{item.item}</p>
						</section>
					))}
				</div>
			</section>

			<button className="swapButton" onClick={handleSwap}>
				Swap
			</button>
		</section>
	);
}

export default App;
