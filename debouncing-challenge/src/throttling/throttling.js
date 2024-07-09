/* 
 we gonna invoke the throttle fn only once. So there is a variable whic takes in account of the last time the "fn to be throttled"
 has been invoked.

 intially the timer is null, the function gets exected . Next timer is assigned a value. so if you try to execute it wont
 work untill a delay has been lapsed. After a certain delay, timer is again set to null.so that function gets invoked after
 the delay is over.

 https://www.freecodecamp.org/news/throttling-in-javascript/ 
 
*/
function fun(a, b) {
	console.log(`This is a function with args ${a} and ${b}`);
}

function throttle(func, delay) {
	let timeout = null;
	return (...args) => {
		if (!timeout) {
			func(...args);
			timeout = setTimeout(() => {
				timeout = null;
			}, delay);
		} else {
			return "fn invocation is declined";
		}
	};
}
const throttleFn = throttle(fun, 5000);

console.log(throttleFn(2, 3));
console.log(throttleFn(2, 3));
console.log(throttleFn(2, 3));
console.log(throttleFn(2, 3));
console.log(throttleFn(2, 3));
console.log(
	setTimeout(() => {
		throttleFn("alpha", "beta");
	}, 700)
);

function throttling(fn, delay) {
	let lastTimeInvoked = 0;
	return (...args) => {
		let currentTimeInvoked = Date.now();
		if (currentTimeInvoked - lastTimeInvoked > delay) {
			lastTimeInvoked = currentTimeInvoked;
			fn(...args);
		}
		return;
	};
}
function greet() {
	return `good morning`;
}

const throttleFn2 = throttling(greet, 5000);
