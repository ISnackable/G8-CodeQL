# Unused parameter
Unused function parameters make code harder to maintain and use. Clients that are unaware that the parameter is unused may perform nontrivial computations to compute a value that is ultimately unused. Even if the parameter is known to be unused, passing in default values such as `null` or `undefined` makes the code hard to read.


## Recommendation
Remove the unused parameter and adjust calls accordingly.


## Example
In this code, the function `f` does not use its second argument `y`, instead computing it from the first argument using function `expensiveComputation`. The code invoking `f` is not aware of this and performs the same computation again, which is wasteful and introduces unnecessary dependencies between otherwise unrelated pieces of code. Instead, the second argument should simply be dropped.


```javascript
function f(x, y) {
	var _y = expensiveComputation(x);
	use(x, _y);
}

var x = 42;
f(x, expensiveComputation(x));
```

## References
* Coding Horror: [Code Smells](http://blog.codinghorror.com/code-smells/).
