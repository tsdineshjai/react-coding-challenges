import React from "react";
import fisherYatesShuffle from "./utillities/shuffleAlgo";

import "./App.css";
import gridArray from "./utillities/constants";
import { Game } from "./components/Game";

function App() {
	const [grid, setGrid] = React.useState(() => {
		return fisherYatesShuffle(gridArray);
	});

	const [stage, setStage] = React.useState("init");

	return (
		<>
			<h1>Memory Game</h1>

			{stage == "init" && (
				<button className="playButton" onClick={() => setStage("start")}>
					Play the game
				</button>
			)}
			{stage == "start" && (
				<Game grid={grid} setGrid={setGrid} setStage={setStage} />
			)}

			{stage == "win" && (
				<>
					<button className="playButton" onClick={() => setStage("start")}>
						You have won the game <br />
						<small>Play the game again</small>
					</button>
				</>
			)}
		</>
	);
}

export default App;
