/* eslint-disable react/prop-types */
import React from "react";
import "./App.css";
import Modal from "./Modal";

function App() {
	const [show, setShow] = React.useState(false);
	const [showAnswer, setShowAnswer] = React.useState(false);

	const toggleModal = () => {
		setShow((prev) => !prev);
	};
	const handleAnswer = () => {
		setShowAnswer((prev) => !prev);
	};

	return (
		<section>
			{showAnswer ? (
				<p>Offer Accepeted</p>
			) : (
				<button onClick={toggleModal}>Show the offer</button>
			)}

			{!!show && (
				<Modal handleAnswer={handleAnswer} toggleModal={toggleModal} />
			)}
		</section>
	);
}

export default App;
