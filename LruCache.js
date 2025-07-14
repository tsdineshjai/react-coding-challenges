/* 
reqs:

1. design a LRU data strcture in that supports the below 

 *. retreives the vallue of the key if it exists , otherwise it returns -1
 *. inserts the key value pair in the cache ,
 *. if it reaches the capacity, it should evict the least recently used before inserting the new One !


 define a structure to note the count in. find the one with least acessed and return the vallue and delete it  

*/

class LruCache {
	constructor() {
		this.cache = new Map(); //datastructure to hold key-value pairs
		this.capacity = 3;
		this.freq = new Map();
	}

	getValue(key) {
		/* whenever we are trying ot access a value  , we are stored the acccessed count, so that we can find the least accessed one */
		if (this.cache.has(key)) {
			if (this.freq.has(key)) {
				this.freq.set(key, this.freq.get(key) + 1);
			} else {
				this.freq.set(key, 1);
			}

			return this.cache.get(key);
		} else {
			return -1;
		}
	}

	inserKV(key, val) {
		this.cache.set(key, val);

		if (!this.cache.has(key)) {
			this.freq.set(key, 0);
		}
		if (this.cache.size == this.capacity) {
			const removableKey = this.getLeastAccessed();
			console.log("the least accessed one is ", removableKey);
			this.cache.delete(removableKey);
			// if it reaches the capacity, delete the least accessed and then insert the new key-value pair !
		}
	}
	getLeastAccessed() {
		console.log(this.freq);
		const valuesOfFreq = this.freq.values();
		const leastValue = Math.min(...valuesOfFreq);
		let leastAccessedKey;
		for (let k of this.freq.keys()) {
			if (this.freq.get(k) == leastValue) {
				leastAccessedKey = k;
				break;
			}
		}

		console.log(leastAccessedKey);
		return leastAccessedKey;
	}
}

const cach = new LruCache();

cach.inserKV("match", "eng vs ind");
cach.inserKV("motivation", "dsicipline you should master");
cach.inserKV("motto", "you gotta believe in yourself");
cach.inserKV("begaraadsfsdf", "calmaaaa");
cach.inserKV("lop", "lopioei");

cach.getValue("match");
cach.getValue("motivation");
cach.getValue("motivation");
cach.getValue("motto");
cach.getValue("motto");

console.log(cach.getLeastAccessed());
console.log(cach.cache.size);
