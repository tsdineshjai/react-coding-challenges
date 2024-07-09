onmessage = (e) => {
	const result = `Result : ${e.data[0] * e.data[1]}`;
	postMessage(result);

	console.log(
		`multiplication of two numbers is caluculate and sent back to the main thread`
	);
};
