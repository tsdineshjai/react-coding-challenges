import React from "react";
import "./styles.css";

export default function App() {
	const [notes, setNotes] = React.useState([]);
	const [singleNote, setSingleNote] = React.useState("");

	function handleSubmit(e) {
		e.preventDefault();
		setNotes((prev) => [...prev, singleNote]);
		setSingleNote("");
	}

	React.useEffect(() => {
		const list = document.querySelector(".message-wrapper");
		if (list.children.length > 1) {
			list.children[list.children?.length - 1].scrollIntoView();
		}
	});

	return (
		<div>
			<div className="container">
				<p>Messages</p>

				<div className="message-wrapper">
					{notes?.map((note) => (
						<p className="message-item">{note}</p>
					))}
				</div>

				<div className="wrapper">
					<input
						type="text"
						value={singleNote}
						onChange={(e) => setSingleNote(e.target.value)}
						placeholder="Type your note.."
					/>
					<span onClick={handleSubmit}>Submit</span>
				</div>
			</div>
		</div>
	);
}
