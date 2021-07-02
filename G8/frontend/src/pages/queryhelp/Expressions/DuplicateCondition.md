# Duplicate 'if' condition
If two conditions in an 'if'-'else if' chain are identical, the second condition will never hold. This most likely indicates a copy-paste error where the first condition was copied and then not properly adjusted. Even if the duplication is intentional (relying, for instance, on non-determinism or side effects), such code is confusing and should be avoided.


## Recommendation
Examine the two conditions to find out what they were meant to check. If both the conditions and the branches that depend on them are identical, then the second branch is duplicate code that can be deleted. Otherwise, the second condition needs to be adjusted.


## Example
In the example below, the function `controller` checks its parameter `msg` to determine what operation it is meant to perform. However, the comparison in the 'else if' is identical to the comparison in the 'if', so this branch will never be taken.


```javascript
function controller(msg) {
	if (msg == 'start')
		start();
	else if (msg == 'start')
		stop();
	else
		throw new Error("Message not understood.");
}
```
Clearly, the 'else if' branch should compare `msg` to `'stop'`:


```javascript
function controller(msg) {
	if (msg == 'start')
		start();
	else if (msg == 'stop')
		stop();
	else
		throw new Error("Message not understood.");
}
```
