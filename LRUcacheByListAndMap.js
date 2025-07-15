// LRU Cache with Doubly Linked List + Map (True O(1) Access)

//we use DLL , as it is very easy for addtions and deletions.

/* 

each node in a doubly linked list has prev and next pointers 

*/

class Node {
	constructor(key, val) {
		this.key = key;
		this.val = val;
		this.prev = null;
		this.next = null;
	}
}

class LRUCache {
	constructor(capacity) {
		this.capacity = capacity;
		this.map = new Map();
		this.head = new Node(null, null);
		this.tail = new Node(null, null);

		this.head.next = this.tail;
		this.tail.prev = this.head;

		//head and tail are dummy data, between them we store actual data
	}

	_add(node) {
		//you alwaays add the node after the head

		node.next = this.head.next;
		node.next.prev = node;
		node.prev = this.head;
		this.head.next = node;
	}

	_remove(node) {
		node.prev.next = node.next;
		node.next.prev = node.prev;
	}

	get(key) {
		if (!this.map.has(key)) return -1;

		const node = this.map.get(key);

		this._remove(node);
		this._add(node);

		return node.value;
	}

	setKeyVal(key, val) {
		if (this.map.has(key)) {
			//we need to udpate the value : for that first get the node from the map

			const node = this.map.get(key);
			node.val = val; //udpated

			//since you have accessed, we have to move to the front
			//how  do we do it : remove the node and add to the head.

			this._remove(node);
			this._add(node);
		} else {
			if (this.map.size >= this.capacity) {
				//we need to remove the least accessed one before adding a new node.

				const lru = this.tail.prev;
				this._remove(lru);
				this.map.delete(lru.key); //we need to delete the entry in map as well.
			}

			const newNode = new Node(key, val);
			console.log(newNode.key, newNode.val);
			this.map.set(key, newNode);
			this._add(newNode);
		}
	}

	print() {
		let currNode = this.head.next;

		const result = [];
		while (currNode != this.tail) {
			result.push([currNode.key, currNode.val]);
			currNode = currNode.next;
		}
		return result;
	}
}
const lru = new LRUCache(3);
lru.setKeyVal("a", 1);
// lru.set("b", 2);
// lru.set("c", 3);
console.log(lru.print());

// lru.get("a");
// console.log(lru.print()); // [['a',1], ['c',3], ['b',2]]

// lru.set("d", 4); // Evicts 'b'
// console.log(lru.print());

/* 
This LRU Cache implementation uses a **doubly linked list (DLL) + hash map** combination to achieve O(1) operations. :

## The Problem We're Solving

LRU Cache needs to:
1. **Track access order** - know which items were used recently vs long ago
2. **Fast lookup** - find items quickly (O(1))
3. **Fast eviction** - remove the least recently used item quickly (O(1))

## Why This Dual Data Structure?

### **Hash Map (this.map)**
- **Purpose**: O(1) key → node lookup
- **Stores**: `key → node reference`
- **Why needed**: Without this, finding a node in the linked list would be O(n)

### **Doubly Linked List**
- **Purpose**: O(1) insertion/deletion + maintains order
- **Order**: Head → Most Recent ... Least Recent ← Tail
- **Why doubly**: Need to remove nodes from middle efficiently

## The Key Insight: Order Represents Recency

```
HEAD → [Most Recent] → [Recent] → [Old] → [Least Recent] → TAIL
```

- **New items**: Added right after HEAD
- **Accessed items**: Moved to right after HEAD  
- **Evicted items**: Removed from right before TAIL

## How Operations Work

### **GET Operation**
1. Map lookup: `this.map.get(key)` → O(1)
2. If found: Move node to front (mark as recently used)
3. Return value

### **SET Operation**
**Case 1 - Key exists:**
1. Update value
2. Move to front (recently used)

**Case 2 - New key:**
1. Check capacity
2. If full: Remove tail node (LRU) + delete from map
3. Create new node
4. Add to map + add to front of list

## The Clever Part: Dummy Nodes

```javascript
this.head = new Node(null, null);  // Dummy
this.tail = new Node(null, null);  // Dummy
this.head.next = this.tail;
this.tail.prev = this.head;
```

**Why dummy nodes?**
- Eliminates null checks when adding/removing
- Always guaranteed to have `node.prev` and `node.next`
- Simplifies edge cases (empty list, single item, etc.)

## Visual Example

```
Initial: HEAD ⟷ TAIL

After set('a',1): HEAD ⟷ [a,1] ⟷ TAIL

After set('b',2): HEAD ⟷ [b,2] ⟷ [a,1] ⟷ TAIL

After get('a'): HEAD ⟷ [a,1] ⟷ [b,2] ⟷ TAIL  // 'a' moved to front
```

## Time Complexity Achievement

- **GET**: O(1) - map lookup + O(1) list operations
- **SET**: O(1) - map operations + O(1) list operations
- **Space**: O(capacity) - map + list store same items

The magic is that the **map gives us instant access** while the **DLL gives us instant reordering**. Together, they solve the LRU problem optimally.

*/
