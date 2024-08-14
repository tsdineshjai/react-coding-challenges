import React, { useState } from "react";
import "./App.css";

const colorList = ["red", "green", "green"];

type ColorStateType = string[];

function App() {
	const [colorState, setColorState] = React.useState<ColorStateType>(colorList);

	const handleClick = (color: string, index: number) => {
		console.log("index is ", index);
		let newState = [...colorState];

		if (color === "green") {
			newState[index] = "red";
			newState.push("green");

			console.log(newState);
		} else {
			newState = colorState.filter((_, ind) => ind !== index);
		}

		setColorState(newState);
	};
	return (
		<div
			style={{
				display: "flex",
				placeItems: "center",
				margin: "0 auto",
				border: "1px solid white",
			}}
		>
			{colorState.map((color, index) => {
				return (
					<Color
						color={color}
						key={"key123" + index}
						handleClick={() => handleClick(color, index)}
					/>
				);
			})}
		</div>
	);
}

export default App;

interface ColorProps {
	color: string;
	index: string;
	handleClick: (color: string, index: number) => ColorStateType;
}

const style = {
	height: "100px",
	width: "100px",
	textAlign: "center",
	borderRadius: "50%",
	color: "white",
	display: "flex",
	placeItems: "center",
	cursor: "pointer",
};

function Color({ color, index, handleClick }: ColorProps) {
	return (
		<div style={{ ...style, backgroundColor: color }} onClick={handleClick}>
			<p>{color}</p>
		</div>
	);
}
