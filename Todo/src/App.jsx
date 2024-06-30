import React from "react";
import "./App.css";

let todoID = 1;
function App() {
	const [store, setStore] = React.useState(() => {
		return localStorage.getItem("store")
			? JSON.parse(localStorage.getItem("store"))
			: [];
	});
	const [item, setItem] = React.useState("");

	React.useEffect(() => {
		localStorage.setItem("store", JSON.stringify(store));
	}, [store]);

	function addItemToTheStore() {
		setStore([
			...store,
			{
				id: todoID++,
				item,
				taskCompleted: false,
			},
		]);
	}

	function handleTaskCompletion(targetId) {
		const updatedStore = store.map((storeItem) => {
			if (storeItem.id === targetId) {
				return {
					...storeItem,
					taskCompleted: !storeItem.taskCompleted,
				};
			} else {
				return storeItem;
			}
		});

		setStore(updatedStore);
		localStorage.setItem("store", JSON.stringify(store));
	}

	function handleDelete(targetItemID) {
		setStore(store.filter((storeItem) => storeItem.id !== targetItemID));
		localStorage.setItem("store", JSON.stringify(store));
	}

	function openDialog() {
		const dialogRef = document.getElementById("deleteDialog");
		dialogRef.showModal();
	}

	return (
		<section className="wrapper">
			<div className="container">
				<div className="addItem">
					<input
						type="text"
						name="item-input"
						id="todo-item"
						value={item}
						onChange={(e) => setItem(e.target.value)}
					/>

					<button type="button" onClick={addItemToTheStore}>
						Add Item
					</button>
				</div>

				<ul>
					{store.map((item) => (
						<li key={item.id}>
							<span>{item.taskCompleted ? <s>{item.item}</s> : item.item}</span>
							<input
								type="checkbox"
								checked={item.taskCompleted}
								onChange={() => handleTaskCompletion(item.id)}
							/>
							<button onClick={openDialog}>Delete</button>

							<dialog id="deleteDialog">
								<div className="dialogContainer">
									<p>Can you confirm again to delete the item</p>

									<p>If, Yes you can click the below button</p>

									<button onClick={() => handleDelete(item.id)}>Delete</button>
								</div>
							</dialog>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}

export default App;
