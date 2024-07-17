import React from "react";
import "./App.css";

let val = 1;
function App() {
	const [count, setCount] = React.useState(0);
	const [history, setHistory] = React.useState([]);
	const [active, setActive] = React.useState(true);

	function handleClick(key) {
		console.log(key);
		setHistory((history) => {
			return [
				{
					preVal: count,
					afterActionVal: count + key,
					action: key,
				},
				...history,
			];
		});
		setCount((prev) => {
			return prev + key;
		});
	}

	function handleUndo() {
		/* 
		two things:
		  undo the last change
			  * remove the last history input.
			  * reset the count value to the previous state
		*/
		setActive(false);
		const prevState = history.at(1);
		setCount(prevState.afterActionVal);
		const copy = [...history];
		copy.shift();
		setHistory(copy);
	}

	function handleRedo() {
		/* 
		redo the last history action
		count value needs to be updated.
		
		*/
		const lastHistory = history.at(0);

		const newHistory = {
			preVal: lastHistory.afterActionVal,
			afterActionVal: lastHistory.afterActionVal + lastHistory.action,
			action: lastHistory.action,
		};

		setHistory((history) => [newHistory, ...history]);

		setCount(newHistory.afterActionVal);
	}

	return (
		<div className="container">
			<h3 style={{ fontFamily: "mono" }}>Undoable Counter</h3>

			<div className="buttons">
				<button onClick={handleUndo}>Undo</button>
				<button onClick={handleRedo} disabled={active}>
					Redo
				</button>
			</div>
			<div className="buttonContainer">
				{[-100, -10, -1].map((ele) => (
					<button key={`count-${ele}`} onClick={() => handleClick(ele)}>
						{ele}
					</button>
				))}

				<span>{count}</span>

				{[+1, +10, +100].map((ele) => (
					<button key={`count-${ele}`} onClick={() => handleClick(ele)}>
						{ele}
					</button>
				))}
			</div>

			<div className="history">
				<h5>History of Events</h5>
				{history.map((history) => (
					<p key={`his-${val++}`}>
						<small>{history.action}</small> ( <small>{history.preVal}</small>
						&rarr;
						<small>{history.afterActionVal}</small> )
					</p>
				))}
			</div>
		</div>
	);
}

export default App;
