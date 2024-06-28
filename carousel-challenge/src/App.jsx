import { useState, useEffect } from "react";
import "./App.css";

const images = [
	"https://images.freeimages.com/images/large-previews/74e/small-flower-close-up-1373255.jpg?fmt=webp&w=500",
	"https://images.freeimages.com/images/large-previews/6f7/flower-bouquet-close-up-1479627.jpg?fmt=webp&w=500",
	"https://images.freeimages.com/images/large-previews/0ff/small-flower-close-up-1373300.jpg?fmt=webp&w=500",
	"https://media.istockphoto.com/id/2147071052/photo/chamomile.webp?b=1&s=612x612&w=0&k=20&c=TFJIMWZjVwy8fpQ-xYLnVN_G1zWfD7YfuhswsA6Z3KY=",
	"https://images.freeimages.com/images/large-previews/90c/flower-close-up-1543017.jpg?fmt=webp&w=500",
];
function App() {
	const [id, setID] = useState(0);

	function handlePrevImage() {
		if (id === 0) {
			setID(images.length - 1);
		}
		setID((prev) => prev - 1);
	}
	function handleNextImage() {
		if (id == images.length - 1) {
			setID(0);
		}
		setID((prev) => prev + 1);
	}

	useEffect(() => {
		let interval = setInterval(() => {
			if (id === images.length - 1) {
				setID((prev) => prev * 0);
			}

			setID((prev) => prev + 1);
		}, 1000);

		return () => {
			clearInterval(interval);
			console.log(`cleanup function got executed`);
		};
	}, [id]);

	return (
		<>
			<section className="container">
				<img
					src={images[id]}
					alt="flowers in the nature"
					height={400}
					width={500}
				/>
				<div className="buttons">
					<button onClick={handlePrevImage}>Prev</button>
					<button onClick={handleNextImage}>Next</button>
				</div>
			</section>
		</>
	);
}

export default App;
