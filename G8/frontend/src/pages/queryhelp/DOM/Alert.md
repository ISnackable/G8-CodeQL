# Invocation of alert
Using the `alert` function to show a message to the user is disruptive, since an alert dialog prevents the user from accessing the rest of the program's interface until the dialog is closed. Also, alert dialogs are displayed by the browser and hence cannot be styled to fit with the rest of the web application, which negatively affects user experience.

Some developers use `alert` during debugging, so left over calls to `alert` may also indicate unfinished code.


## Recommendation
Use one of the HTML-based dialog box widgets offered by frameworks such as [jQuery UI](http://jqueryui.com), and consider using a non-modal dialog box where possible.


## Example
The following code snippet uses `alert` to print a warning message if an element of a form is not correctly filled in. A preferable option would be to visually highlight the corresponding field to provide more context for the warning.


```javascript
if (!/[\w.]+@[\w.]+\.\w+/.test(form.email.value))
	alert("Please enter a valid email address.");
```

## References
* Mozilla Developer Network: [Window.alert](https://developer.mozilla.org/en-US/docs/Web/API/Window.alert).
* Common Weakness Enumeration: [CWE-489](https://cwe.mitre.org/data/definitions/489.html).
