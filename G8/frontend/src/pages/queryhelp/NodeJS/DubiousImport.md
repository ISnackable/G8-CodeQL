# Dubious import
Since JavaScript is a dynamically typed language, module imports in node.js are not statically checked for correctness: calls to `require` simply return an object containing all the exports of the imported module, and accessing a member that was not, in fact, exported, yields `undefined`. This is most likely unintentional and usually indicates a bug.


## Recommendation
Examine the import in question and determine the correct name of the symbol to import.


## Example
In the following example, module `point.js` exports the function `Point` by assigning it to `module.exports`. The client module `client.js` tries to import it by reading from the `Point` property, but since this property does not exist the result will be `undefined`, and the `new` invocation will fail.


```javascript
// point.js
function Point(x, y) {
	this.x = x;
	this.y = y;
}

Point.prototype.distance = function() {
	return Math.sqrt(this.x*this.x+this.y*this.y);
};

module.exports = Point;

// client.js
var Point = require('./point').Point;

var pyth = new Point(3, 4);
console.log(pyth.distance());
```
Instead of reading the `Point` property, `client.js` should directly use the result of the `require` call:


```javascript
// point.js
function Point(x, y) {
	this.x = x;
	this.y = y;
}

Point.prototype.distance = function() {
	return Math.sqrt(this.x*this.x+this.y*this.y);
};

module.exports = Point;

// client.js
var Point = require('./point');

var pyth = new Point(3, 4);
console.log(pyth.distance());
```

## References
* Node.js Manual: [Modules](http://nodejs.org/api/modules.html).
