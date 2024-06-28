/* 
Debouncing :
It needs to do two things

1. Delay the invokation of a function by a certain time
2. Reset the timer if the function is called within the delay time. (Delay has not elapsed)

*/

function Debounce(fn, delay) {
	let timer = null;
	return (...args) => {
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			fn(...args);  //uscase : the fn is the one that makes the backend api call to fetch the data for the keyword search.
		}, delay);
	};
}

function Sum(a, b) {
	console.log(a + b);
}

const debouncedFn = Debounce(Sum, 5000);

console.log(debouncedFn(3, 5)); //timer is null, fn gets executed after a delay and timerID value is assigned to the timer variable.
console.log(debouncedFn(3, 5)); //2nd iteration. , it checks if timer exists.this will reset the previous timer()..calls the fn again.
console.log(debouncedFn(3, 5)); // 3rd iteration ..same thing happens. the timer is reset. prev scheduled timer fn
//gets garbage collected and fresh timeOut fn starts and will execute the callback fn after the delay
console.log(debouncedFn(3, 5)); // same as 4th iteratin. if the delay is over, then also timer is cleared, new timer starts
// and callback fn of timeout executse after the delay.
