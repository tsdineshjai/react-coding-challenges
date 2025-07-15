/* 
reqs:

1. design a LRU data strcture in that supports the below 

 *. retreives the vallue of the key if it exists , otherwise it returns -1
 *. inserts the key value pair in the cache ,
 *. if it reaches the capacity, it should evict the least recently used before inserting the new One !


 define a structure to note the count in. find the one with least acessed and return the vallue and delete it  

*/

// this example is defind the LRU using Map data structure !!
class LRUcache {
	constructor(capacity) {
		this.capacity = capacity;

		this.cache = new Map();
	}

	// method to get a value , it is considered accessing

	getValue(key) {
		if (!this.cache.get(key)) return -1;

		//logic is to delete the key that we gonna access and to add the key
		//when we add, it will be the at the end of the map. which is considered as most rceently accessed.

		const value = this.cache.get(key);

		this.cache.delete(key);
		this.cache.set(key, value);

		return value;
	}

	setValue(key, val) {
		if (this.cache.has(key)) {
			this.cache.delete(key);
		}
		if (this.cache.size >= this.capacity) {
			// what we need to do here is the delete the least accessed one once it reaches the capacity
			// we can do by map.keys() which returns a iterator , iterator has a next() method which returns {value, done}
			//this gets the first value.

			const leastAccessedKey = this.cache.keys().next().value;

			console.log(leastAccessedKey);
			this.cache.delete(leastAccessedKey);

			console.log(`we are deleting this key: ${leastAccessedKey}`);
		}

		this.cache.set(key, val);
	}

	printValues() {
		console.log(...this.cache.entries());
	}
}

const lru = new LRUcache(3);

lru.setValue("A", "apples");
lru.setValue("b", "bananans");
lru.setValue("c", "citrus fruits");
lru.setValue("d", "dandilliosns");

lru.printValues();
console.log(lru.cache.size);


