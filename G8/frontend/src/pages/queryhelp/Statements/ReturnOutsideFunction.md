# Return statement outside function
In JavaScript, `return` statements are not allowed outside functions in most cases, the main exception being event handler code in HTML attributes. On the other hand, `return` is not allowed in `javascript:` URLs, and will cause a runtime exception on many browsers.


## Recommendation
Investigate the code to see whether the `return` statement should be nested in a function.


## Example
In the following HTML snippet, a developer has implemented a function `validateForm` that should be invoked when the form is submitted to check its contents for wellformedness, and prevent submission if validation fails. The developer attempts to achieve this by invoking `validateForm` through a `javascript:` URL in the form's `action` attribute:


```html
<form name="f" action="javascript:return validateForm(this);" method="post">
    <!--  form contents -->
</form>
```
This will not work in practice, since the `return` causes a syntax error. Instead, the validation should be moved to the `onsubmit` event handler, where a `return` statement is legal:


```html
<form name="f" onsubmit="return validateForm(this);" method="post">
    <!--  form contents -->
</form>
```

## References
* Mozilla Developer Network: [Return](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return).
