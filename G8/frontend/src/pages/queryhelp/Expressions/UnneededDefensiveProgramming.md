# Unneeded defensive code
Defensive code can prevent unforeseen circumstances from causing fatal program behaviors. A common defensive code pattern is to guard against dereferencing the values `null` or `undefined`. However, if the situation that some defensive code guards against never can occur, then the defensive code serves no purpose and can safely be removed.


## Recommendation
Examine the surrounding code to determine if the defensive code is worth keeping despite providing no practical use. If it is no longer needed, remove it.


## Example
The following example shows a `cleanupLater` function that asynchronously will perform a cleanup task after some delay. When the cleanup task completes, the function invokes the provided callback parameter `cb`. To prevent a crash by invoking `cb` when it has the value `undefined`, defensive code guards the invocation by checking if `cb` is truthy.


```javascript
function cleanupLater(delay, cb) {
    setTimeout(function() {
        cleanup();
        if (cb) { // BAD: useless check, `cb` is always truthy
            cb();
        }
    }, delay)
}

cleanupLater(1000, function(){console.log("Cleanup done")});

```
However, the `cleanupLater` function is always invoked with a callback argument, so the defensive code condition always holds, and it is therefore not required. The function can therefore be simplified to:


```javascript
function cleanupLater(delay, cb) {
    setTimeout(function() {
        cleanupNow();
        // GOOD: no need to guard the invocation
        cb();
    }, delay)
}

cleanupLater(function(){console.log("Cleanup done")});

```
Guarding against the same situation multiple times is another example of defensive code that provides no practical use. The example below shows a function that assigns a value to a property of an object, where defensive code ensures that the assigned value is not `undefined` or `null`.


```javascript
function setSafeStringProp(o, prop, v) {
    // BAD: `v == null` is useless
    var safe = v == undefined || v == null? '': v;
    o[prop] = safe;
}

```
However, due to coercion rules, `v == undefined` holds for both the situation where `v` is`undefined` and the situation where `v` is`null`, so the `v == null` guard serves no purpose, and can be removed:


```javascript
function setSafeStringProp(o, prop, v) {
    // GOOD: `v == undefined` handles both `undefined` and `null`
    var safe = v == undefined? '': v;
    o[prop] = safe;
}

```

## References
* Wikipedia: [Defensive programming](https://en.wikipedia.org/wiki/Defensive_programming).
* Common Weakness Enumeration: [CWE-570](https://cwe.mitre.org/data/definitions/570.html).
* Common Weakness Enumeration: [CWE-571](https://cwe.mitre.org/data/definitions/571.html).
