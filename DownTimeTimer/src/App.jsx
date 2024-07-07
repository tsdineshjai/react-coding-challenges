import React from "react";
import "./App.css";

function App() {
	const [state, setState] = React.useState({
		hours: "",
		mins: "",
		secs: "",
	});

	const [showAddControls, setShowAddControls] = React.useState(false);
	const [pause, setPause] = React.useState(false);
	const timerRef = React.useRef(null);

	function handleChange(e) {
		const value = parseInt(e.target.value);
		setState({
			...state,
			[e.target.name]: value,
		});
	}

	const { hours, mins, secs } = state;

	if (hours === 0 && mins === 0 && secs === 0) {
		resetHandler();
	}

	function Timer() {
		setState((state) => {
			if (state.mins === 0 && state.secs === 0 && state.hours > 0) {
				return {
					...state,
					hours: state.hours - 1,
					mins: 59,
					secs: 59,
				};
			}
			if (state.secs === 0 && state.mins > 0) {
				return {
					...state,
					mins: state.mins - 1,
					secs: 59,
				};
			}
			if (state.secs > 0) {
				return {
					...state,
					secs: state.secs - 1,
				};
			} else {
				return {
					...state,
				};
			}
		});
    
		/* 
    	setState((prevState) => {
		let { hours, mins, secs } = prevState;

		if (secs === 0) {
			if (mins === 0) {
				if (hours > 0) {
					hours -= 1;
					mins = 59;
					secs = 59;
				}
			} else {
				mins -= 1;
				secs = 59;
			}
		} else {
			secs -= 1;
		}

		return { hours, mins, secs };
	  });
    
    */
	}

	console.log(state);
	async function handleStart() {
		if (pause) {
			timerRef.current = setInterval(() => {
				Timer();
			}, 1000);
		} else {
			setShowAddControls((prev) => !prev);
			timerRef.current = setInterval(Timer, 1000);
		}
	}
	function pauseHandler() {
		if (pause) {
			handleStart();
			setPause((prev) => !prev);
		} else {
			clearInterval(timerRef.current);
			setPause((prev) => !prev);
		}
	}

	function resetHandler() {
		console.log("reset handler is invoked");
		clearInterval(timerRef.current);
		setState((prev) => {
			return {
				...prev,
				hours: "",
				mins: "",
				secs: "",
			};
		});

		setShowAddControls(false);
	}

	return (
		<div className="wrapper">
			<section className="timer">
				<label htmlFor="hours" aria-label="input for hours">
					<input
						type="text"
						required
						name="hours"
						id="hours"
						value={state.hours > 10 ? state.hours : "0" + state.hours}
						onChange={handleChange}
						placeholder="HH"
						pattern="[0-9]{1,2}"
						className={showAddControls ? "removeBorder" : null}
					/>
					<span hidden={showAddControls} className="validity"></span>
				</label>
				<span className="colon">:</span>
				<label htmlFor="minutes" aria-label="input for mins">
					<input
						type="text"
						required
						name="mins"
						id="minutes"
						value={state.mins > 10 ? state.mins : "0" + state.mins}
						onChange={handleChange}
						placeholder="MM"
						min={0}
						max={60}
						pattern="[0-9]{1,2}"
						className={showAddControls ? "removeBorder" : null}
					/>
					<span hidden={showAddControls} className="validity"></span>
					{state.mins <= 60 ? null : (
						<small> ✖ Enter a number between 00 and 60</small>
					)}
				</label>
				<span className="colon">:</span>
				<label htmlFor="seconds" aria-label="input for mins">
					<input
						type="text"
						required
						name="secs"
						id="seconds"
						value={state.secs > 10 ? state.secs : "0" + state.secs}
						onChange={handleChange}
						placeholder="SS"
						min={0}
						max={60}
						pattern="^(?:[0][0-9]|[1-5][0-9]|60)$"
						className={showAddControls ? "removeBorder" : null}
					/>
					<span hidden={showAddControls} className="validity"></span>

					{state.secs <= 60 ? null : (
						<small> ✖ Enter a number between 00 and 60</small>
					)}
				</label>

				{showAddControls ? (
					<>
						<button type="button" onClick={pauseHandler}>
							{pause ? "Resume" : "pause"}
						</button>
						<button type="button" onClick={resetHandler}>
							Reset
						</button>
					</>
				) : (
					<button type="button" onClick={handleStart}>
						Start
					</button>
				)}
			</section>
		</div>
	);
}

export default App;
