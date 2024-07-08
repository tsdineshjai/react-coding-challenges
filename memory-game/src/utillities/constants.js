const array = [];
for (let i = 1; i <= 18; i++) {
	array.push(i);
}
const gridArray = [...array, ...array];

export default gridArray;
