# Template Object Injection
Directly using user-controlled objects as arguments to template engines might allow an attacker to do local file reads or even remote code execution.


## Recommendation
Avoid using user-controlled objects as arguments to a template engine. Instead, construct the object explicitly with the specific properties needed by the template.


## Example
In the example below a server uses the user-controlled `profile` object to render the `index` template.


```javascript
var app = require('express')();
app.set('view engine', 'hbs');

app.post('/', function (req, res, next) {
    var profile = req.body.profile;
    res.render('index', profile);
});
```
However, if an attacker adds a `layout` property to the `profile` object then the server will load the file specified by the `layout` property, thereby allowing an attacker to do local file reads.

The fix is to have the server construct the object, and only add the properties that are needed by the template.


```javascript
var app = require('express')();
app.set('view engine', 'hbs');

app.post('/', function (req, res, next) {
    var profile = req.body.profile;
    res.render('index', {
        name: profile.name,
        location: profile.location
    });
});
```

## References
* blog.shoebpatel.com: [The Secret Parameter, LFR, and Potential RCE in NodeJS Apps](https://blog.shoebpatel.com/2021/01/23/The-Secret-Parameter-LFR-and-Potential-RCE-in-NodeJS-Apps/).
* cwe.mitre.org: [CWE-73: External Control of File Name or Path](https://cwe.mitre.org/data/definitions/73.html)
* Common Weakness Enumeration: [CWE-73](https://cwe.mitre.org/data/definitions/73.html).
* Common Weakness Enumeration: [CWE-94](https://cwe.mitre.org/data/definitions/94.html).
