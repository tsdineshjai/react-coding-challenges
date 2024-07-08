import React from "react";
import { Box } from "../Box";
import "./Game.css";

import PropTypes from "prop-types";

function Game({ grid, setStage }) {
	const [opened, setOpened] = React.useState([]);
	const [solvedList, setSolvedList] = React.useState([]);

	function handleClick(index) {
		if (opened.length == 2) return;
		setOpened((prev) => {
			return [...prev, index];
		});
	}

	if (solvedList.length == Math.floor(grid.length / 2) - 1) {
		setStage("win");
	}
	React.useEffect(() => {
		if (opened.length === 2) {
			setTimeout(() => {
				const [indx1, indx2] = opened;

				if (grid[indx1] === grid[indx2]) {
					setSolvedList((prev) => [...prev, grid[indx1]]);
				}

				setOpened([]);
			}, 750);
		}
	}, [opened, grid]);

	return (
		<section className="gridContainer">
			{grid.map((number, ind) => (
				<Box
					key={`box-${ind}`}
					number={number}
					index={ind}
					handleClick={handleClick}
					solvedList={solvedList}
					opened={opened}
				/>
			))}
		</section>
	);
}

export default Game;

Game.propTypes = {
	grid: PropTypes.array.isRequired,
	setSelected: PropTypes.func,
	setGrid: PropTypes.func,
	setStage: PropTypes.func,
};
