const obj = {
	name: "jai",
	age: 45,
};

const craeteValidateUser = (userObj) => {
	return new Proxy(userObj, {
		get(target, property, value) {
			if (Reflect.has(target, property)) {
				property == "name" && typeof property == "string"
					? Reflect.set(target, property, value)
					: (() => {
							throw TypeError("write the proper type");
					  })();
				property == "age" && typeof property == "number"
					? Reflect.set(target, property, value)
					: (() => {
							throw TypeError("write the proper type");
					  })();
			}
		},
	});
};

const proxiedObj = craeteValidateUser(obj);

proxiedObj.name = "tanishka sri";
proxiedObj.age = 55;


console.log(proxiedObj)