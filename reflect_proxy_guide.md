# JavaScript Reflect and Proxy: Beginner to Pro Guide

## Table of Contents
1. [Introduction](#introduction)
2. [Reflect API](#reflect-api)
3. [Proxy Basics](#proxy-basics)
4. [Proxy Traps](#proxy-traps)
5. [Practical Examples](#practical-examples)
6. [Advanced Patterns](#advanced-patterns)
7. [Performance & Best Practices](#performance--best-practices)
8. [Real-world Applications](#real-world-applications)

---

## Introduction

**Reflect** and **Proxy** are ES6 features that provide powerful metaprogramming capabilities in JavaScript. They allow you to intercept and customize operations on objects (property access, assignment, enumeration, function invocation, etc.).

### Key Concepts
- **Proxy**: Creates a wrapper around an object that can intercept operations
- **Reflect**: Provides methods for interceptable JavaScript operations
- **Handler**: Object that defines which operations are intercepted
- **Traps**: Methods in the handler that provide property access

---

## Reflect API

### What is Reflect?

Reflect is a built-in object that provides methods for interceptable JavaScript operations. It's not a constructor - you can't use `new Reflect()`.

### Core Reflect Methods

```javascript
const obj = { name: "Alice", age: 30 };

// 1. Reflect.get() - Get property value
console.log(Reflect.get(obj, 'name')); // "Alice"
console.log(obj.name); // Same as above, but Reflect is more explicit

// 2. Reflect.set() - Set property value
Reflect.set(obj, 'age', 31);
console.log(obj.age); // 31

// 3. Reflect.has() - Check if property exists
console.log(Reflect.has(obj, 'name')); // true
console.log('name' in obj); // Same as above

// 4. Reflect.deleteProperty() - Delete property
Reflect.deleteProperty(obj, 'age');
console.log(obj); // { name: "Alice" }

// 5. Reflect.ownKeys() - Get all property keys
console.log(Reflect.ownKeys(obj)); // ["name"]
```

### More Reflect Methods

```javascript
// 6. Reflect.defineProperty() - Define property with descriptor
const user = {};
Reflect.defineProperty(user, 'id', {
  value: 123,
  writable: false,
  enumerable: true,
  configurable: false
});

// 7. Reflect.getOwnPropertyDescriptor() - Get property descriptor
const descriptor = Reflect.getOwnPropertyDescriptor(user, 'id');
console.log(descriptor); // { value: 123, writable: false, enumerable: true, configurable: false }

// 8. Reflect.getPrototypeOf() - Get prototype
console.log(Reflect.getPrototypeOf(user)); // Object.prototype

// 9. Reflect.setPrototypeOf() - Set prototype
const customProto = { greet() { return "Hello!"; } };
Reflect.setPrototypeOf(user, customProto);

// 10. Reflect.isExtensible() - Check if object is extensible
console.log(Reflect.isExtensible(user)); // true

// 11. Reflect.preventExtensions() - Prevent extensions
Reflect.preventExtensions(user);
console.log(Reflect.isExtensible(user)); // false
```

### Function-related Reflect Methods

```javascript
function greet(name, greeting = "Hello") {
  return `${greeting}, ${name}!`;
}

// 12. Reflect.apply() - Call function with arguments
const result = Reflect.apply(greet, null, ["Alice", "Hi"]);
console.log(result); // "Hi, Alice!"

// 13. Reflect.construct() - Create instance with constructor
class Person {
  constructor(name) {
    this.name = name;
  }
}

const person = Reflect.construct(Person, ["Bob"]);
console.log(person.name); // "Bob"
```

---

## Proxy Basics

### Creating a Proxy

```javascript
const target = { name: "Alice", age: 30 };

const handler = {
  get(target, property) {
    console.log(`Getting ${property}`);
    return target[property];
  },
  
  set(target, property, value) {
    console.log(`Setting ${property} to ${value}`);
    target[property] = value;
    return true; // Must return true for successful assignment
  }
};

const proxy = new Proxy(target, handler);

proxy.name; // Logs: "Getting name", returns "Alice"
proxy.age = 31; // Logs: "Setting age to 31"
```

### Basic Proxy Example

```javascript
// Simple validation proxy
const createValidatedUser = (userData) => {
  return new Proxy(userData, {
    set(target, property, value) {
      if (property === 'age' && (typeof value !== 'number' || value < 0)) {
        throw new Error('Age must be a positive number');
      }
      if (property === 'email' && !value.includes('@')) {
        throw new Error('Invalid email format');
      }
      
      target[property] = value;
      return true;
    }
  });
};

const user = createValidatedUser({ name: "Alice" });
user.age = 25; // Works fine
user.email = "alice@example.com"; // Works fine
// user.age = -5; // Throws error
// user.email = "invalid"; // Throws error
```

---

## Proxy Traps

### Complete List of Traps

```javascript
const target = { name: "Alice", age: 30 };

const handler = {
  // Property access
  get(target, property, receiver) {
    console.log(`GET: ${property}`);
    return Reflect.get(target, property, receiver);
  },
  
  // Property assignment
  set(target, property, value, receiver) {
    console.log(`SET: ${property} = ${value}`);
    return Reflect.set(target, property, value, receiver);
  },
  
  // 'in' operator
  has(target, property) {
    console.log(`HAS: ${property}`);
    return Reflect.has(target, property);
  },
  
  // delete operator
  deleteProperty(target, property) {
    console.log(`DELETE: ${property}`);
    return Reflect.deleteProperty(target, property);
  },
  
  // Object.keys(), Object.getOwnPropertyNames(), etc.
  ownKeys(target) {
    console.log('OWNKEYS');
    return Reflect.ownKeys(target);
  },
  
  // Object.getOwnPropertyDescriptor()
  getOwnPropertyDescriptor(target, property) {
    console.log(`GET_DESCRIPTOR: ${property}`);
    return Reflect.getOwnPropertyDescriptor(target, property);
  },
  
  // Object.defineProperty()
  defineProperty(target, property, descriptor) {
    console.log(`DEFINE: ${property}`);
    return Reflect.defineProperty(target, property, descriptor);
  },
  
  // Object.getPrototypeOf()
  getPrototypeOf(target) {
    console.log('GET_PROTOTYPE');
    return Reflect.getPrototypeOf(target);
  },
  
  // Object.setPrototypeOf()
  setPrototypeOf(target, prototype) {
    console.log('SET_PROTOTYPE');
    return Reflect.setPrototypeOf(target, prototype);
  },
  
  // Object.isExtensible()
  isExtensible(target) {
    console.log('IS_EXTENSIBLE');
    return Reflect.isExtensible(target);
  },
  
  // Object.preventExtensions()
  preventExtensions(target) {
    console.log('PREVENT_EXTENSIONS');
    return Reflect.preventExtensions(target);
  },
  
  // Function calls
  apply(target, thisArg, argumentsList) {
    console.log('APPLY');
    return Reflect.apply(target, thisArg, argumentsList);
  },
  
  // 'new' operator
  construct(target, argumentsList, newTarget) {
    console.log('CONSTRUCT');
    return Reflect.construct(target, argumentsList, newTarget);
  }
};
```

---

## Practical Examples

### 1. Default Values

```javascript
const withDefaults = (target, defaults) => {
  return new Proxy(target, {
    get(target, property) {
      return property in target ? target[property] : defaults[property];
    }
  });
};

const user = withDefaults({ name: "Alice" }, { age: 0, country: "Unknown" });
console.log(user.name); // "Alice"
console.log(user.age); // 0 (default)
console.log(user.country); // "Unknown" (default)
```

### 2. Property Validation

```javascript
const createValidator = (schema) => {
  return new Proxy({}, {
    set(target, property, value) {
      const validator = schema[property];
      if (validator && !validator(value)) {
        throw new Error(`Invalid value for ${property}: ${value}`);
      }
      target[property] = value;
      return true;
    }
  });
};

const userSchema = {
  name: (value) => typeof value === 'string' && value.length > 0,
  age: (value) => typeof value === 'number' && value >= 0,
  email: (value) => typeof value === 'string' && value.includes('@')
};

const user = createValidator(userSchema);
user.name = "Alice"; // OK
user.age = 25; // OK
// user.age = -5; // Throws error
// user.email = "invalid"; // Throws error
```

### 3. Array Negative Indexing

```javascript
const createArray = (arr) => {
  return new Proxy(arr, {
    get(target, property) {
      if (typeof property === 'string' && !isNaN(property)) {
        const index = parseInt(property);
        if (index < 0) {
          return target[target.length + index];
        }
      }
      return target[property];
    }
  });
};

const numbers = createArray([1, 2, 3, 4, 5]);
console.log(numbers[-1]); // 5 (last element)
console.log(numbers[-2]); // 4 (second to last)
```

### 4. Property Access Logging

```javascript
const createLogger = (target, name = 'Object') => {
  return new Proxy(target, {
    get(target, property) {
      console.log(`[${name}] Getting property: ${property}`);
      return target[property];
    },
    set(target, property, value) {
      console.log(`[${name}] Setting property: ${property} = ${value}`);
      target[property] = value;
      return true;
    }
  });
};

const user = createLogger({ name: "Alice" }, "User");
user.name; // Logs: [User] Getting property: name
user.age = 30; // Logs: [User] Setting property: age = 30
```

### 5. Enum-like Object

```javascript
const createEnum = (values) => {
  const enumObject = {};
  values.forEach((value, index) => {
    enumObject[value] = index;
  });
  
  return new Proxy(enumObject, {
    set() {
      throw new Error('Cannot modify enum');
    },
    deleteProperty() {
      throw new Error('Cannot delete enum property');
    }
  });
};

const Colors = createEnum(['RED', 'GREEN', 'BLUE']);
console.log(Colors.RED); // 0
console.log(Colors.GREEN); // 1
// Colors.YELLOW = 3; // Throws error
// delete Colors.RED; // Throws error
```

---

## Advanced Patterns

### 1. Observable Pattern

```javascript
const createObservable = (target, onChange) => {
  const observers = new Set();
  
  const observable = new Proxy(target, {
    set(target, property, value, receiver) {
      const oldValue = target[property];
      const result = Reflect.set(target, property, value, receiver);
      
      if (result && oldValue !== value) {
        observers.forEach(callback => callback(property, value, oldValue));
      }
      
      return result;
    }
  });
  
  observable.observe = (callback) => {
    observers.add(callback);
    return () => observers.delete(callback); // Unsubscribe function
  };
  
  return observable;
};

const user = createObservable({ name: "Alice", age: 30 });

const unsubscribe = user.observe((property, newValue, oldValue) => {
  console.log(`${property} changed from ${oldValue} to ${newValue}`);
});

user.name = "Bob"; // Logs: name changed from Alice to Bob
user.age = 31; // Logs: age changed from 30 to 31
```

### 2. Computed Properties

```javascript
const createComputed = (target, computedProps) => {
  return new Proxy(target, {
    get(target, property) {
      if (property in computedProps) {
        return computedProps[property].call(target);
      }
      return target[property];
    },
    
    ownKeys(target) {
      return [...Reflect.ownKeys(target), ...Object.keys(computedProps)];
    },
    
    has(target, property) {
      return property in target || property in computedProps;
    }
  });
};

const person = createComputed(
  { firstName: "John", lastName: "Doe", age: 30 },
  {
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
    isAdult() {
      return this.age >= 18;
    }
  }
);

console.log(person.fullName); // "John Doe"
console.log(person.isAdult); // true
console.log(Object.keys(person)); // ["firstName", "lastName", "age", "fullName", "isAdult"]
```

### 3. Method Chaining

```javascript
const createChainable = (target) => {
  return new Proxy(target, {
    get(target, property) {
      if (typeof target[property] === 'function') {
        return function(...args) {
          const result = target[property].apply(target, args);
          return result === undefined ? createChainable(target) : result;
        };
      }
      return target[property];
    }
  });
};

class Calculator {
  constructor(value = 0) {
    this.value = value;
  }
  
  add(n) {
    this.value += n;
  }
  
  multiply(n) {
    this.value *= n;
  }
  
  getValue() {
    return this.value;
  }
}

const calc = createChainable(new Calculator(10));
const result = calc.add(5).multiply(2).getValue(); // 30
```

### 4. Deep Proxy

```javascript
const createDeepProxy = (target, handler) => {
  const proxyCache = new WeakMap();
  
  const createProxy = (obj) => {
    if (proxyCache.has(obj)) {
      return proxyCache.get(obj);
    }
    
    const proxy = new Proxy(obj, {
      get(target, property) {
        const value = target[property];
        
        if (typeof value === 'object' && value !== null) {
          return createProxy(value);
        }
        
        if (handler.get) {
          return handler.get(target, property, value);
        }
        
        return value;
      },
      
      set(target, property, value) {
        if (handler.set) {
          return handler.set(target, property, value);
        }
        
        target[property] = value;
        return true;
      }
    });
    
    proxyCache.set(obj, proxy);
    return proxy;
  };
  
  return createProxy(target);
};

const data = {
  user: {
    profile: {
      name: "Alice",
      preferences: {
        theme: "dark"
      }
    }
  }
};

const deepProxy = createDeepProxy(data, {
  get(target, property, value) {
    console.log(`Accessing: ${property}`);
    return value;
  },
  set(target, property, value) {
    console.log(`Setting: ${property} = ${value}`);
    target[property] = value;
    return true;
  }
});

deepProxy.user.profile.name; // Logs: Accessing: user, Accessing: profile, Accessing: name
deepProxy.user.profile.preferences.theme = "light"; // Logs deep property access and setting
```

---

## Performance & Best Practices

### Performance Considerations

```javascript
// 1. Avoid unnecessary proxy creation
const cache = new WeakMap();

const createCachedProxy = (target, handler) => {
  if (cache.has(target)) {
    return cache.get(target);
  }
  
  const proxy = new Proxy(target, handler);
  cache.set(target, proxy);
  return proxy;
};

// 2. Use Reflect for default behavior
const handler = {
  get(target, property, receiver) {
    // Do custom logic
    console.log(`Getting ${property}`);
    
    // Use Reflect for default behavior (more efficient)
    return Reflect.get(target, property, receiver);
  }
};

// 3. Minimize trap complexity
const simpleHandler = {
  get(target, property) {
    // Simple, fast operations
    return property in target ? target[property] : undefined;
  }
};
```

### Best Practices

```javascript
// 1. Always return appropriate values from traps
const goodHandler = {
  set(target, property, value) {
    target[property] = value;
    return true; // Always return true for successful sets
  },
  
  deleteProperty(target, property) {
    delete target[property];
    return true; // Return true if deletion was successful
  }
};

// 2. Handle edge cases
const robustHandler = {
  get(target, property) {
    if (typeof property === 'symbol') {
      return target[property];
    }
    
    if (property === 'valueOf' || property === 'toString') {
      return target[property];
    }
    
    // Your custom logic here
    return target[property];
  }
};

// 3. Use proper error handling
const safeHandler = {
  set(target, property, value) {
    try {
      if (typeof value === 'undefined') {
        throw new Error('Cannot set undefined value');
      }
      
      target[property] = value;
      return true;
    } catch (error) {
      console.error('Proxy set error:', error);
      return false;
    }
  }
};
```

---

## Real-world Applications

### 1. API Client with Automatic Endpoint Generation

```javascript
const createApiClient = (baseURL) => {
  const cache = new Map();
  
  return new Proxy({}, {
    get(target, property) {
      if (cache.has(property)) {
        return cache.get(property);
      }
      
      const endpoint = {
        get: (id) => fetch(`${baseURL}/${property}${id ? `/${id}` : ''}`).then(r => r.json()),
        post: (data) => fetch(`${baseURL}/${property}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        }).then(r => r.json()),
        put: (id, data) => fetch(`${baseURL}/${property}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        }).then(r => r.json()),
        delete: (id) => fetch(`${baseURL}/${property}/${id}`, {
          method: 'DELETE'
        }).then(r => r.json())
      };
      
      cache.set(property, endpoint);
      return endpoint;
    }
  });
};

const api = createApiClient('https://api.example.com');

// Usage:
// api.users.get() - GET /users
// api.users.get(123) - GET /users/123
// api.users.post({name: "Alice"}) - POST /users
// api.posts.put(456, {title: "New Title"}) - PUT /posts/456
```

### 2. State Management with Immutability

```javascript
const createImmutableState = (initialState) => {
  let state = { ...initialState };
  const listeners = new Set();
  
  const notify = (newState) => {
    listeners.forEach(listener => listener(newState, state));
    state = newState;
  };
  
  const stateProxy = new Proxy(state, {
    set(target, property, value) {
      if (target[property] === value) return true;
      
      const newState = { ...target, [property]: value };
      notify(newState);
      return true;
    },
    
    get(target, property) {
      if (property === 'subscribe') {
        return (callback) => {
          listeners.add(callback);
          return () => listeners.delete(callback);
        };
      }
      
      if (property === 'getState') {
        return () => ({ ...state });
      }
      
      return state[property];
    }
  });
  
  return stateProxy;
};

const appState = createImmutableState({ count: 0, user: null });

appState.subscribe((newState, oldState) => {
  console.log('State changed:', { oldState, newState });
});

appState.count = 1; // Triggers subscription
appState.user = { name: "Alice" }; // Triggers subscription
```

### 3. Smart Object with Method Auto-generation

```javascript
const createSmartObject = (data) => {
  return new Proxy(data, {
    get(target, property) {
      if (property in target) {
        return target[property];
      }
      
      // Generate getter methods
      if (property.startsWith('get')) {
        const propName = property.slice(3).toLowerCase();
        if (propName in target) {
          return () => target[propName];
        }
      }
      
      // Generate setter methods
      if (property.startsWith('set')) {
        const propName = property.slice(3).toLowerCase();
        return (value) => {
          target[propName] = value;
          return this;
        };
      }
      
      // Generate has methods
      if (property.startsWith('has')) {
        const propName = property.slice(3).toLowerCase();
        return () => propName in target;
      }
      
      return undefined;
    }
  });
};

const user = createSmartObject({ name: "Alice", age: 30 });

console.log(user.getName()); // "Alice"
user.setAge(31);
console.log(user.hasName()); // true
console.log(user.hasEmail()); // false
```

### 4. Database Query Builder

```javascript
const createQueryBuilder = (tableName) => {
  const query = {
    table: tableName,
    select: ['*'],
    where: [],
    orderBy: [],
    limit: null
  };
  
  return new Proxy({}, {
    get(target, property) {
      if (property === 'build') {
        return () => {
          let sql = `SELECT ${query.select.join(', ')} FROM ${query.table}`;
          
          if (query.where.length > 0) {
            sql += ` WHERE ${query.where.join(' AND ')}`;
          }
          
          if (query.orderBy.length > 0) {
            sql += ` ORDER BY ${query.orderBy.join(', ')}`;
          }
          
          if (query.limit) {
            sql += ` LIMIT ${query.limit}`;
          }
          
          return sql;
        };
      }
      
      if (property === 'select') {
        return (...fields) => {
          query.select = fields;
          return createQueryBuilder(tableName);
        };
      }
      
      if (property === 'where') {
        return (condition) => {
          query.where.push(condition);
          return createQueryBuilder(tableName);
        };
      }
      
      if (property === 'orderBy') {
        return (field, direction = 'ASC') => {
          query.orderBy.push(`${field} ${direction}`);
          return createQueryBuilder(tableName);
        };
      }
      
      if (property === 'limit') {
        return (count) => {
          query.limit = count;
          return createQueryBuilder(tableName);
        };
      }
      
      return target[property];
    }
  });
};

const queryBuilder = createQueryBuilder('users');
const sql = queryBuilder
  .select('name', 'email')
  .where('age > 18')
  .where('active = true')
  .orderBy('name', 'ASC')
  .limit(10)
  .build();

console.log(sql);
// SELECT name, email FROM users WHERE age > 18 AND active = true ORDER BY name ASC LIMIT 10
```

---

## Conclusion

Reflect and Proxy provide powerful metaprogramming capabilities that can solve complex problems elegantly. Key takeaways:

- **Reflect** provides a consistent API for object operations
- **Proxy** enables intercepting and customizing object operations
- Use them for validation, logging, computed properties, and API abstractions
- Always consider performance implications
- Follow best practices for maintainable code

These tools open up possibilities for creating more dynamic and flexible JavaScript applications, from simple property validation to complex state management systems.