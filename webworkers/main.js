const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");

const result = document.getElementById("result");

if (window.Worker) {
	const myWorker = new Worker("worker.js");

	[input1, input2].forEach((input) => {
		input.onchange = function () {
			myWorker.postMessage([input1.value, input2.value]);

			console.log(
				`input numbers were sent to the worker thread from main thread using worker`
			);
		};
	});

	myWorker.onmessage = (e) => {
		result.textContent = `${e.data}`;
	};
} else {
	console.log(`worker thread is not available here`);
}
