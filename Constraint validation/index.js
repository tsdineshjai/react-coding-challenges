function checkZIP() {
	// For each country, defines the pattern that the ZIP has to follow

	const constraints = {
		ch: [
			"^(CH-)?\\d{4}$",
			"Switzerland ZIPs must have exactly 4 digits: e.g. CH-1950 or 1950",
		],
		fr: [
			"^(F-)?\\d{5}$",
			"France ZIPs must have exactly 5 digits: e.g. F-75012 or 75012",
		],
		de: [
			"^(D-)?\\d{5}$",
			"Germany ZIPs must have exactly 5 digits: e.g. D-12345 or 12345",
		],
		nl: [
			"^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
			"Netherland ZIPs must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
		],
	};

	//read country id

	const country = document.getElementById("Country").value;
	// Get the NPA field
	const ZIPField = document.getElementById("ZIP");

	//build the constraint checker.

	const constraint = new RegExp(constraints[country][0], "");

	console.log("zip function is invoked", constraint.test(ZIPField.value));

	if (constraint.test(ZIPField.value)) {
		// The ZIP follows the constraint, we use the ConstraintAPI to tell it  --> line:45
		ZIPField.setCustomValidity("");
	} else {
		ZIPField.setCustomValidity(constraints[country][1]);
		ZIPField.reportValidity();
	}
}

/* 
Basically, the idea is to trigger JavaScript on some form field event (like onchange) to 
calculate whether the constraint is violated, and then to use the
method field.setCustomValidity() to set the result of the validation: 
an empty string means the constraint is satisfied, and any other string 
means there is an error and this string is the error message to display to the user.
*/

window.onload = () => {
	document.getElementById("Country").onchange = checkZIP;
	document.getElementById("ZIP").oninput = checkZIP;
	document.getElementById("FS").onchange = checkFileSize;
};

function checkFileSize() {
	const FS = document.getElementById("FS");
	const files = FS.files;

	// If there is (at least) one file selected
	if (files.length > 0) {
		if (files[0].size > 75 * 1024) {
			// Check the constraint
			FS.setCustomValidity("The selected file must not be larger than 75 kB");
			FS.reportValidity();
			return;
		}
	}
	// No custom constraint violation
	FS.setCustomValidity("");
}
