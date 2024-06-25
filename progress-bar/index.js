const buttonRef = document.getElementById("start");
const childRef = document.getElementById("child");

function progressFunc() {
	let width = 0;
	for (let i = 1; i <= 10; i++) {
		setTimeout(() => {
			width += 30;
			childRef.style.width = `${width}px`;
			childRef.style.backgroundColor = "green";
			childRef.textContent = `${(width / 300) * 100}%`;
		}, i * 1000);
	}
}

// throttle function to prevnt multiple click with in a fraction of second
//this makes sure , we can only invoke the functin again after some delay.

function throttle(func, delay) {
	let lastCall = 0;

	return function (...args) {
		const now = new Date().getTime();

		if (now - lastCall < delay) {
			return;
		}
		lastCall = now;
		return func(...args);
	};
}

const throttleProgress = throttle(progressFunc, 1000 * 10);
buttonRef.addEventListener("click", throttleProgress);
