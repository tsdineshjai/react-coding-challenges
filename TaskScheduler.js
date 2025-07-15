/* 
TaskSCheduler in JS


The tasks should be in concurrency with a limit 
if the limit is reached, place the tasks in the queue

task should be done only if the the concurrency task is less than limit set 

*/

class TaskScheduler {
	constructor(concurrency) {
		this.concurrency = concurrency;
		this.taskCount = 0;
		this.taskQueue = [];
	}

	runQueueTask() {
		if (this.taskCount < this.concurrency && this.taskQueue.length > 0) {
			const task = this.taskQueue.shift();
			this.addTask(task);
		}
	}
	addTask(task) {
		return new Promise((res, rej) => {
			async function taskRunner() {
				this.taskCount++;
				try {
					const result = await task();
					res(result);
				} catch (e) {
					console.log(e.message);
					rej(e);
				} finally {
					this.taskCount--;
					this.runQueueTask();
				}
			}

			if (this.taskCount < this.concurrency) {
				taskRunner.apply(this);
			} else {
				this.taskQueue.push(task);
			}
		});
	}
}

const taskMaint = new TaskScheduler(1);

taskMaint.addTask(() => {
	return new Promise((res) => {
		setTimeout(() => {
			console.log("Task 1 ");
			res();
		}, 5000);
	});
});
taskMaint.addTask(() => {
	return new Promise((res) => {
		setTimeout(() => {
			console.log("Task 2");
			res();
		}, 5000);
	});
});
taskMaint.addTask(() => {
	return new Promise((res) => {
		setTimeout(() => {
			console.log("Task 3");
			res();
		}, 1000);
	});
});
