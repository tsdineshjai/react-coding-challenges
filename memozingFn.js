function memoization() {
	let cache = {};

	return (value) => {
		if (!cache[value]) {
			//do the expensive function calls  and store the result in  the cache
			//for simplicity i am just adding a single line of code.
			const result = value + 300;

			cache[value] = result;
			console.log(`performed expensive function calls`);
			return result;
		} else {
			console.log(`returned cached value`);
			return cache[value];
		}
	};
}

const memoizedFn = memoization();

console.log(memoizedFn(32)); //performed expensive fn calls
console.log(memoizedFn(45)); //performed expensive fn calls
console.log(memoizedFn(45)); //returned cached result
