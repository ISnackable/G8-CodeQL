# Resource exhaustion
Applications are constrained by how many resources they can make use of. Failing to respect these constraints may cause the application to be unresponsive or crash. It is therefore problematic if attackers can control the sizes or lifetimes of allocated objects.


## Recommendation
Ensure that attackers can not control object sizes and their lifetimes. If object sizes and lifetimes must be controlled by external parties, ensure you restrict the object sizes and lifetimes so that they are within acceptable ranges.


## Example
The following example lets a user choose a delay after which a function is executed:


```javascript
var http = require("http"),
    url = require("url");

var server = http.createServer(function(req, res) {
	var delay = parseInt(url.parse(req.url, true).query.delay);

	setTimeout(f, delay); // BAD

});

```
This is problematic because a large delay essentially makes the application wait indefinitely before executing the function. Repeated registrations of such delays will therefore use up all of the memory in the application. A limit on the delay will prevent the attack:


```javascript
var http = require("http"),
    url = require("url");

var server = http.createServer(function(req, res) {
	var delay = parseInt(url.parse(req.url, true).query.delay);

	if (delay > 1000) {
		res.statusCode = 400;
		res.end("Bad request.");
		return;
	}

	setTimeout(f, delay); // GOOD

});

```

## References
* Common Weakness Enumeration: [CWE-770](https://cwe.mitre.org/data/definitions/770.html).
