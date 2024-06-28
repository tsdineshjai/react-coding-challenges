const useDebounce = (fn, delay) => {
	let timeout = null;

	return () => {
		if (timeout) {
			clearTimeout(timeout);
		}

		timeout = setTimeout(() => {
			fn();
		}, delay);
	};
};

export default useDebounce;
