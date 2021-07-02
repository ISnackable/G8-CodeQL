# Code injection
Directly evaluating user input (for example, an HTTP request parameter) as code without properly sanitizing the input first allows an attacker arbitrary code execution. This can occur when user input is treated as JavaScript, or passed to a framework which interprets it as an expression to be evaluated. Examples include AngularJS expressions or JQuery selectors.


## Recommendation
Avoid including user input in any expression which may be dynamically evaluated. If user input must be included, use context-specific escaping before including it. It is important that the correct escaping is used for the type of evaluation that will occur.


## Example
The following example shows part of the page URL being evaluated as JavaScript code. This allows an attacker to provide JavaScript within the URL. If an attacker can persuade a user to click on a link to such a URL, the attacker can evaluate arbitrary JavaScript in the browser of the user to, for example, steal cookies containing session information.


```javascript
eval(document.location.href.substring(document.location.href.indexOf("default=")+8))

```
The following example shows a Pug template being constructed from user input, allowing attackers to run arbitrary code via a payload such as `#{global.process.exit(1)}`.


```javascript
const express = require('express')
var pug = require('pug');
const app = express()

app.post('/', (req, res) => {
    var input = req.query.username;
    var template = `
doctype
html
head
    title= 'Hello world'
body
    form(action='/' method='post')
        input#name.form-control(type='text)
        button.btn.btn-primary(type='submit') Submit
    p Hello `+ input
    var fn = pug.compile(template);
    var html = fn();
    res.send(html);
})

```
Below is an example of how to use a template engine without any risk of template injection. The user input is included via an interpolation expression `#{username}` whose value is provided as an option to the template, instead of being part of the template string itself:


```javascript
const express = require('express')
var pug = require('pug');
const app = express()

app.post('/', (req, res) => {
    var input = req.query.username;
    var template = `
doctype
html
head
    title= 'Hello world'
body
    form(action='/' method='post')
        input#name.form-control(type='text)
        button.btn.btn-primary(type='submit') Submit
    p Hello #{username}`
    var fn = pug.compile(template);
    var html = fn({username: input});
    res.send(html);
})

```

## References
* OWASP: [Code Injection](https://www.owasp.org/index.php/Code_Injection).
* Wikipedia: [Code Injection](https://en.wikipedia.org/wiki/Code_injection).
* PortSwigger Research Blog: [Server-Side Template Injection](https://portswigger.net/research/server-side-template-injection).
* Common Weakness Enumeration: [CWE-94](https://cwe.mitre.org/data/definitions/94.html).
* Common Weakness Enumeration: [CWE-79](https://cwe.mitre.org/data/definitions/79.html).
* Common Weakness Enumeration: [CWE-116](https://cwe.mitre.org/data/definitions/116.html).
