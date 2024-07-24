/* 

Service Workers
Definition

Service Workers are scripts that run in the background of a web application, separate from the web page. 
They are primarily used to enable offline capabilities, push notifications, background data synchronization, and intercept network requests.
Key Features

    Runs in the Background: Not tied to a specific web page.
    Intercepts Network Requests: Can cache resources for offline use.
    Event-Driven: Operates through events like install, activate, and fetch.
    Persistent: Remains active even when the web page is closed.

*/

// Registering the Service Worker

/* 1. Offline Support

Service Workers can cache resources to ensure that a web application remains functional even when there is no network connection. */
if ("serviceWorker" in navigator) {
	navigator.serviceWorker
		.register("/service-worker.js")
		.then((registration) => {
			console.log("Service Worker registered with scope:", registration.scope);
		})
		.catch((error) => {
			console.error("Service Worker registration failed:", error);
		});
}

// service-worker.js
self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open("v1").then((cache) => {
			return cache.addAll([
				"/",
				"/index.html",
				"/styles.css",
				"/script.js",
				"/offline.html",
			]);
		})
	);
});

self.addEventListener("fetch", (event) => {
	event.respondWith(
		caches
			.match(event.request)
			.then((response) => {
				return response || fetch(event.request);
			})
			.catch(() => {
				return caches.match("/offline.html");
			})
	);
});

/* 2. Push Notifications

Service Workers enable web applications to receive and display push notifications, even when the application is not active. */

// Registering the Service Worker
if ("serviceWorker" in navigator) {
	navigator.serviceWorker
		.register("/service-worker.js")
		.then((registration) => {
			console.log("Service Worker registered with scope:", registration.scope);
		})
		.catch((error) => {
			console.error("Service Worker registration failed:", error);
		});
}

// Requesting Notification Permission
Notification.requestPermission().then((permission) => {
	if (permission === "granted") {
		// Permission granted
		navigator.serviceWorker.ready.then((registration) => {
			registration.showNotification("Hello World!", {
				body: "This is a push notification.",
				icon: "/icon.png",
			});
		});
	}
});

// service-worker.js
self.addEventListener("push", (event) => {
	const data = event.data.json();
	const options = {
		body: data.body,
		icon: data.icon,
	};
	event.waitUntil(self.registration.showNotification(data.title, options));
});
