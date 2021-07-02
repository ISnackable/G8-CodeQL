# Function with too many parameters
Functions with many parameters are hard to understand and to use, and should be avoided.


## Recommendation
In some cases it may be possible to split the function into multiple smaller functions, each of which only requires a subset of parameters. Where this is not possible, consider passing the parameters as an object literal and accessing them as properties of that literal.


## Example
In the following example, function `sendRecord` has nine parameters. Such a function is hard to use, since the user has to remember in which order to pass the arguments.


```javascript
function sendRecord(firstName, lastName, dateOfBirth, streetAddress, postCode, city, country, email, website) {
	sendResponse({
		name: lastName + ', ' + firstName,
		DOB: dateOfBirth,
		address: streetAddress + '\n' + postCode + ' ' + city + '\n' + country,
		email: email,
		url: website
	});
}
```
The function should be refactored to use a parameter object instead, with each parameter of the old function corresponding to a property of the object as in the following code. Of course, any calls to the function have to be updated accordingly.


```javascript
function sendRecord(record) {
	sendResponse({
		name: record.lastName + ', ' + record.firstName,
		DOB: record.dateOfBirth,
		address: record.streetAddress + '\n'
		       + record.postCode + ' ' + record.city + '\n'
		       + record.country,
		email: record.email,
		url: record.website
	});
}
```

## References
* Cunningham &amp; Cunningham, Inc: [Code Smell: Too Many Parameters](http://c2.com/cgi/wiki?TooManyParameters).
