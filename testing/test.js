class TaskRunner {
	constructor() {
		this.taskQueue = [];
		this.taskRunnig = false;
		this.taskCount = 0;
	}

	async addTask(task) {
		this.taskQueue.push(task);
		if (!this.taskRunnig) {
			const result = await this.processQueue();
			console.log("the result valu is", result);
		}
	}

	async processQueue() {
		//if the task is currently running or there is no tasks in the qaueue dont do anything
		if (this.taskRunnig || this.taskQueue.length == 0) return;

		//we gonna do task one by one

		this.taskRunnig = true;
		this.taskCount++;
		const task = this.taskQueue.shift();

		try {
			console.log(`Task ${this.taskCount} has started`);
			const result = await task();
			return result;
		} catch (e) {
			console.log(`An error has occured`, e);
		} finally {
			this.taskRunnig = false;
			console.log(`Task ${this.taskCount} has completed`);
			if (!this.taskRunnig && this.taskQueue.length > 0)
				await this.processQueue();
		}
	}
}

const inst = new TaskRunner();
// const task2 = () =>
// 	new Promise((_, reject) => {
// 		setTimeout(() => {
// 			reject("promise has been rejected for task 2");
// 		}, 0);
// 	});

// const task1 = () =>
// 	new Promise((resolve) => {
// 		setTimeout(() => {
// 			resolve("promise has been resolved for task 1");
// 		}, 0);
// 	});

const task3 = () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve("promise has been resolved for task 3");
		}, 0);
	});
};

inst
	.addTask(task3)
	.then((res) => console.log(res))
	.catch((e) => console.log("error has occurred", e));

// inst
// 	.addTask(task1)
// 	.then((res) => console.log(res))
// 	.catch((e) => console.log("error has occurred", e));
// inst
// 	.addTask(task2)
// 	.then((res) => console.log(res))
// 	.catch((e) => console.log("error has occurred", e));
