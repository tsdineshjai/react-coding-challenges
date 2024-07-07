import React from "react";
import "./modal.css";

function Modal({ toggleModal }) {
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
	return (
		<div className="modal-wrapper">
			<div className="modal">
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam,
					explicabo voluptatibus ullam amet doloribus itaque culpa id animi
					odit? Facilis error, quod laudantium odit delectus repellendus aliquid
					voluptatibus porro. Facilis. Tempora debitis, perspiciatis eaque
					necessitatibus accusantium maiores expedita qui quam iure voluptatibus
					assumenda, possimus quos saepe aliquid dolores quo perferendis, libero
					magni repudiandae voluptates! Consectetur ex quasi autem dolore quo.
				</p>

				<span onClick={toggleModal}>X</span>
			</div>
		</div>
	);
}

export default Modal;
