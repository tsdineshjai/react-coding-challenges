/* 

fetchTimerReq
that uses abortController )
listener that listen for the abort event. 
finally clean up everything 
*/

async function FetchFnWithAbortUsage(url, delay) {
	const controller = new AbortController();

	const signal = controller.signal;

	const timerId = setTimeout(() => {
		controller.abort();
	}, delay);

	signal.onabort = () => {
		console.log("fetch event has been aborted");
	};

	signal.addEventListener("abort", () =>
		console.log("fetch event was aborteed")
	);

	try {
    const res = await fetch(url, { signal });
    return await res.json();
  } finally {
    clearTimeout(timerId);

    signal.removeEventListener("abort", () => console.log("fetch event was aborted")
    );
  }
}
