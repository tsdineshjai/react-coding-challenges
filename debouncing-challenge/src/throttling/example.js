function App() {
	const fetchData = async () => {
		const resp = await fetch("http://localhost:8000/data");
		return resp.json();
	};
	const handleClick = () => {
		fetchData().then((data) => {
			console.log(data);
		});
	};

	const throttleHandleClick = Throttle(handleClick, 3000);

	return (
		<div className="App">
			<button onClick={throttleHandleClick}>Click Me</button>
		</div>
	);
}

export default App;

function Throttle(fn, delay) {
	let timer = null;

	return (...args) => {
		if (!timer) {
			fn(...args);
			timer = setTimeout(() => {
				timer = null;
			}, delay);
		}
	};
}
