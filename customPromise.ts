type PromiseState = "pending" | "fulfilled" | "rejected";

type ResolveFunction<T> = (value: T | PromiseLike<T>) => void;
type RejectFunction = (reason?: any) => void;
type OnFulfilled<T, R> = (value: T) => R | PromiseLike<R>;
type OnRejected<R> = (reason: any) => R | PromiseLike<R>;

type ExecutorType<T> = (
	resolve: ResolveFunction<T>,
	reject: RejectFunction
) => void;

interface Callback<T, R> {
	onFulfilled?: OnFulfilled<T, R>;
	onRejected?: OnRejected<R>;
	resolve: ResolveFunction<R>;
	reject: RejectFunction;
}

class CustomPromise<T> {
	private state: PromiseState = "pending";
	private value: any;
	private reason: any;
	private callbacks: Callback<T, any>[] = [];

	constructor(executor: ExecutorType<T>) {
		const resolve: ResolveFunction<T> = (value) => {
			if (this.state !== "pending") return;
			this.state = "fulfilled";
			this.value = value;

			setTimeout(() => {
				this.callbacks.forEach((callback) => {
					if (callback.onFulfilled) {
						try {
							const result = callback.onFulfilled(this.value as T);
							callback.resolve(result);
						} catch (error) {
							callback.reject(error);
						}
					}
				});
			}, 0);
		};

		const reject: RejectFunction = (reason) => {
			if (this.state !== "pending") return;
			this.state = "rejected";
			this.reason = reason;

			setTimeout(() => {
				this.callbacks.forEach((callback) => {
					if (callback.onRejected) {
						try {
							const result = callback.onRejected(this.reason);
							callback.resolve(result);
						} catch (error) {
							callback.reject(error);
						}
					} else {
						callback.reject(this.reason);
					}
				});
			}, 0);
		};

		try {
			executor(resolve, reject);
		} catch (error) {
			reject(error);
		}
	}

	then<R>(
		onFulfilled?: OnFulfilled<T, R>,
		onRejected?: OnRejected<R>
	): CustomPromise<R> {
		const newPromise = new CustomPromise<R>((resolve, reject) => {
			const callback: Callback<T, R> = {
				onFulfilled:
					typeof onFulfilled === "function"
						? onFulfilled
						: (value) => value as any,
				onRejected:
					typeof onRejected === "function"
						? onRejected
						: (reason) => {
								throw reason;
						  },
				resolve,
				reject,
			};

			if (this.state === "fulfilled") {
				setTimeout(() => {
					try {
						const result = callback.onFulfilled!(this.value as T);
						resolve(result);
					} catch (error) {
						reject(error);
					}
				}, 0);
			} else if (this.state === "rejected") {
				setTimeout(() => {
					try {
						const result = callback.onRejected!(this.reason);
						resolve(result);
					} catch (error) {
						reject(error);
					}
				}, 0);
			} else {
				this.callbacks.push(callback);
			}
		});

		return newPromise;
	}

	catch<R>(onRejected?: OnRejected<R>): CustomPromise<R> {
		return this.then(undefined, onRejected);
	}
}
