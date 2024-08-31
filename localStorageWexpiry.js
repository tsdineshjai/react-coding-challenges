/* 

Extend the local storage to accept an expiry time and expire the entry after that time.
*/

// set 'bar' on 'foo' that will expiry after 1000 milliseconds
// myLocalStorage.setItem('foo', 'bar', 1000);

// after 2 seconds
// console.log(myLocalStorage.getItem('foo'));
// null

 window.myLocalStorage = {
		setItem(key, value, expiry) {
			let storageObj = {
				data: value,
			};
			if (expiry) {
				storageObj.expiryDuraion = Date.now() + expiry;
			}
			window.localStorage.setItem(key, JSON.stringify(storageObj));
		},
		getItem(key) {
			const result = JSON.parse(window.localStorage.getItem(key));
			if (result) {
				if (result.expiryDuraion <= Date.now()) {
					window.localStorage.removeItem(key);
					return null;
				} else {
					return result.data;
				}
			}
			return null;
		},
 };

 myLocalStorage.setItem("foo", "bar", 3000);

 setTimeout(() => {
		console.log(JSON.parse(window.localStorage.getItem("foo")).data);
 }, 4000);