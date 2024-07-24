onmessage = (e) => {
	const result = `Result : ${e.data[0] * e.data[1]}`;
	postMessage(result);

	console.log(
		`multiplication of two numbers is caluculate and sent back to the main thread`
	);
};

/* 
Definition

Web Workers are scripts that run in the background, parallel to the main browser thread. 
They are used to perform computationally intensive tasks without blocking the user interface.
Key Features

    Runs in the Background: Operates on a separate thread from the main UI.
    Parallel Execution: Can perform tasks simultaneously with the main thread.
    No DOM Access: Cannot directly manipulate the DOM.
    Communication via Messaging: Interacts with the main thread through message passing.

*/
