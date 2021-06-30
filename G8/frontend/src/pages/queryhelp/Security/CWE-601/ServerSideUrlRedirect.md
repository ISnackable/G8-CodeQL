# Server-side URL redirect
Directly incorporating user input into a URL redirect request without validating the input can facilitate phishing attacks. In these attacks, unsuspecting users can be redirected to a malicious site that looks very similar to the real site they intend to visit, but which is controlled by the attacker.


## Recommendation
To guard against untrusted URL redirection, it is advisable to avoid putting user input directly into a redirect URL. Instead, maintain a list of authorized redirects on the server; then choose from that list based on the user input provided.


## Example
The following example shows an HTTP request parameter being used directly in a URL redirect without validating the input, which facilitates phishing attacks:


```javascript
const app = require("express")();

app.get('/some/path', function(req, res) {
  // BAD: a request parameter is incorporated without validation into a URL redirect
  res.redirect(req.param("target"));
});

```
One way to remedy the problem is to validate the user input against a known fixed string before doing the redirection:


```javascript
const app = require("express")();

const VALID_REDIRECT = "http://cwe.mitre.org/data/definitions/601.html";

app.get('/some/path', function(req, res) {
  // GOOD: the request parameter is validated against a known fixed string
  let target = req.param("target");
  if (VALID_REDIRECT === target)
    res.redirect(target);
});

```

## References
* OWASP: [ XSS Unvalidated Redirects and Forwards Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.html).
* Common Weakness Enumeration: [CWE-601](https://cwe.mitre.org/data/definitions/601.html).
