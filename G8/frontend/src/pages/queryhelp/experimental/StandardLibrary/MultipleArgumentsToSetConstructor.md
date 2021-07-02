# Multiple arguments to `Set` constructor
The `Set` constructor accepts an arbitrary number of arguments, but only the first one is used to construct the set. The remaining arguments are ignored. Code that invokes the `Set` constructor with multiple arguments is therefore likely to be incorrect.


## Recommendation
Only pass a single argument to the `Set` constructor, which should be an iterable object (such as an array).


## Example
The following example creates a set containing the vowels in the English language, and defines a function that returns a boolean indicating whether a given character is a vowel:


```javascript
const vowels = new Set('a', 'e', 'i', 'o', 'u');

function isVowel(char) {
  return vowels.has(char.toLowerCase());
}

```
However, this code does not work as intended: the `Set` constructor ignores all but the first argument, so the `vowels` set only contains the letter `a`.

Instead, the list of vowels should be wrapped into an array:


```javascript
const vowels = new Set(['a', 'e', 'i', 'o', 'u']);

function isVowel(char) {
  return vowels.has(char.toLowerCase());
}

```

## References
* [MDN Web Docs: Set() constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/Set)
