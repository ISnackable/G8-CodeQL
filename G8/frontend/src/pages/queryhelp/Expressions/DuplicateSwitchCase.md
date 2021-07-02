# Duplicate switch case
In JavaScript, cases in a switch statement can have arbitrary expressions as their labels. The interpreter does not check that these expressions are all different. At runtime, if two cases in a switch statement have the same label, the second case will never be executed. This most likely indicates a copy-paste error where the first case was copied and then not properly adjusted.


## Recommendation
Examine the two cases to find out what they were meant to check. If both the case labels and their statements are identical, then the second case is duplicate code that can be deleted. Otherwise, the second case label needs to be adjusted.


## Example
In the example below, the function `controller` checks its parameter `msg` to determine what operation it is meant to perform. Note that the 'switch' statement has two cases labeled `'start'`; the second one will never be executed.


```javascript
function controller(msg) {
	switch (msg) {
	case 'start':
		start();
		break;
	case 'start':
		stop();
		break;
	default:
		throw new Error("Message not understood.");
	}
}
```
Clearly, the second case should be labeled `'stop'`:


```javascript
function controller(msg) {
	switch (msg) {
	case 'start':
		start();
		break;
	case 'stop':
		stop();
		break;
	default:
		throw new Error("Message not understood.");
	}
}
```
