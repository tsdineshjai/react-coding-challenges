import React from "react";
import "./App.css";

let val = 1;

function reducer(state, action) {
	switch (action.type) {
		case "DecrementBy100": {
			action.prevState.current = state;

			console.log("I am triggered");
			action.setHistory(() => {
				return [
					...action.history,
					{
						valueBefore: state,
						valueAfter: state - 100,
						type: action.op,
					},
				];
			});

			action.setLastActionType({
				...action,
			});
			return state - 100;
		}
		case "DecrementBy10": {
			action.prevState.current = state;
			action.setHistory([
				...action.history,
				{
					valueBefore: state,
					valueAfter: state - 10,
					type: action.op,
				},
			]);

			return state - 10;
		}
		case "DecrementBy1": {
			action.prevState.current = state;
			action.setHistory([
				...action.history,
				{
					valueBefore: state,
					valueAfter: state - 1,
					type: action.op,
				},
			]);

			return state - 1;
		}
		case "IncrementBy1": {
			action.prevState.current = state;
			action.setHistory([
				...action.history,
				{
					valueBefore: state,
					valueAfter: state + 1,
					type: action.op,
				},
			]);

			return state + 1;
		}
		case "IncrementBy10": {
			action.prevState.current = state;
			action.setHistory([
				...action.history,
				{
					valueBefore: state,
					valueAfter: state + 10,
					type: action.op,
				},
			]);

			return state + 10;
		}
		case "IncrementBy100": {
			action.prevState.current = state;
			action.setHistory([
				...action.history,
				{
					valueBefore: state,
					valueAfter: state + 100,
					type: action.op,
				},
			]);

			return state + 100;
		}
		case "Undo": {
			const lastAction = action.history[action.history.length - 1];
			if (!lastAction) return state;

			action.setRedoStack((prevRedoStack) => [...prevRedoStack, lastAction]);

			action.setHistory((prevHistory) =>
				prevHistory.slice(0, prevHistory.length - 1)
			);

			return lastAction.valueBefore;
		}
		case "Redo": {
			const lastRedoAction = action.redoStack[action.redoStack.length - 1];
			if (!lastRedoAction) return state;

			action.setRedoStack((prevRedoStack) =>
				prevRedoStack.slice(0, prevRedoStack.length - 1)
			);

			action.setHistory((prevHistory) => [...prevHistory, lastRedoAction]);

			return lastRedoAction.valueAfter;
		}
		default:
			return state;
	}
}

function initFn() {
	return 0;
}

function App() {
	const [countState, dispatch] = React.useReducer(reducer, null, initFn);
	const prevState = React.useRef(countState);
	const [history, setHistory] = React.useState([]);
	const [lastActionType, setLastActionType] = React.useState({});
	const [redoStack, setRedoStack] = React.useState([]);

	console.log(history);

	return (
		<div>
			<section className="undoableCounter">
				<h1>Undoable Counter</h1>
				<button
					onClick={() =>
						dispatch({
							type: "Undo",
							history,
							setHistory,
							redoStack,
							setRedoStack,
						})
					}
				>
					Undo
				</button>
				<button
					onClick={() =>
						dispatch({
							type: "Redo",
							history,
							setHistory,
							redoStack,
							setRedoStack,
						})
					}
				>
					Redo
				</button>
			</section>

			<section className="buttonContainer">
				<button
					onClick={() =>
						dispatch({
							type: "DecrementBy100",
							op: "-100",
							prevState,
							setHistory,
							history,
							setLastActionType,
						})
					}
				>
					-100
				</button>
				<button
					onClick={() =>
						dispatch({
							type: "DecrementBy10",
							op: "-10",
							prevState,
							setHistory,
							history,
							setLastActionType,
						})
					}
				>
					-10
				</button>
				<button
					onClick={() =>
						dispatch({
							type: "DecrementBy1",
							op: "-1",
							prevState,
							setHistory,
							history,
							setLastActionType,
						})
					}
				>
					-1
				</button>
				<span>{countState}</span>
				<button
					onClick={() =>
						dispatch({
							type: "IncrementBy1",
							op: "+1",
							prevState,
							setHistory,
							history,
							setLastActionType,
						})
					}
				>
					+1
				</button>
				<button
					onClick={() =>
						dispatch({
							type: "IncrementBy10",
							op: "+10",
							prevState,
							setHistory,
							history,
							setLastActionType,
						})
					}
				>
					+10
				</button>
				<button
					onClick={() =>
						dispatch({
							type: "IncrementBy100",
							op: "+100",
							prevState,
							setHistory,
							history,
							setLastActionType,
						})
					}
				>
					+100
				</button>
			</section>

			<section className="history">
				{history.map((eachHistory) => (
					<section key={`history-${val++}`} className="historyUnitWrapper">
						<p>
							{eachHistory.type} <small></small> (
							{
								<>
									<small>{`${eachHistory.valueBefore}`}</small>

									<small>{`${eachHistory.valueAfter}`}</small>
								</>
							}
							)
						</p>
					</section>
				))}
			</section>
		</div>
	);
}

export default App;
