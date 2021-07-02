# Missing X-Frame-Options HTTP header
Websites that do not specify the `X-Frame-Options` HTTP header may be vulnerable to UI redress attacks ("clickjacking"). In these attacks, the vulnerable site is loaded in a frame on an attacker-controlled site which uses opaque or transparent layers to trick the user into unintentionally clicking a button or link on the vulnerable site.


## Recommendation
Set the `X-Frame-Options` HTTP header to `DENY`, to instruct web browsers to block attempts to load the site in a frame. Alternatively, if framing is needed in certain circumstances, specify `SAMEORIGIN` or `ALLOW FROM: ...` to limit the ability to frame the site to pages from the same origin, or from an allowed whitelist of trusted domains.

For [express](https://www.npmjs.com/package/express) applications, the header may be specified by setting `res.setHeader('X-Frame-Options', 'DENY')` on each request. Several npm modules provide this functionality as well: [frameguard](https://www.npmjs.com/package/frameguard), [helmet](https://www.npmjs.com/package/helmet), [x-frame-options](https://www.npmjs.com/package/x-frame-options)

Alternatively, the header can be set by a proxy. As an example, a [HAProxy](http://www.haproxy.org/) configuration should contain: `rspadd X-Frame-Options:\ DENY` to set the header automatically.


## Example
The following example shows an [express](https://www.npmjs.com/package/express) application that does *not* set the `X-Frame-Options` header on its responses:


```javascript
var express = require('express'),
    app = express();


app.get('/', function (req, res) {
    res.send('X-Frame-Options: ' + res.get('X-Frame-Options'))
})

```
The application can be made safer by setting the `X-Frame-Options` header before responding:


```javascript
var express = require('express'),
    app = express();


app.get('/', function (req, res) {
    res.set('X-Frame-Options', value)
    res.send('X-Frame-Options: ' + res.get('X-Frame-Options'))
})

```

## References
* OWASP: [Clickjacking Defense Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Clickjacking_Defense_Cheat_Sheet.html).
* Mozilla: [X-Frame-Options](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options)
* Common Weakness Enumeration: [CWE-451](https://cwe.mitre.org/data/definitions/451.html).
* Common Weakness Enumeration: [CWE-829](https://cwe.mitre.org/data/definitions/829.html).
