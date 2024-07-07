import React from "react";
import "./App.css";
import Modal from "./modal";

function App() {
	const [show, setShow] = React.useState(false);

	const toggleModal = () => {
		setShow((prev) => !prev);
	};

	const openModal = () => {
		const dialogRef = document.getElementById("my-dialog");
		dialogRef.showModal();
	};
	const closeModal = () => {
		const dialogRef = document.getElementById("my-dialog");
		dialogRef.close();
	};
	return (
		<section>
			<button onClick={toggleModal}>show the modal</button>

			{!!show && <Modal toggleModal={toggleModal} />}

			<dialog id="my-dialog">
				<button autoFocus onClick={closeModal}>
					Close
				</button>
				<p>This modal dialog has a groovy backdrop!</p>
			</dialog>
			<button onClick={openModal}>
				Show the dialog(used native dialog html element)
			</button>
		</section>
	);
}

export default App;
