/* eslint-disable react/prop-types */
import React from "react";
import "./modal.css";

function Modal({ toggleModal, handleAnswer }) {
	React.useEffect(() => {
		function CallbackFunction(e) {
			if (e.code === "Escape") {
				toggleModal();
			}
		}
		window.addEventListener("keydown", CallbackFunction);
		return () => {
			window.removeEventListener("keydown", CallbackFunction);
		};
	}, [toggleModal]);

	function handleOffer() {
		toggleModal();
		handleAnswer();
	}
	return (
		<div className="modal-wrapper">
			<div className="modal">
				<button onClick={handleOffer}>Accept the offer</button>

				<span onClick={toggleModal}>X</span>
			</div>
		</div>
	);
}

export default Modal;
