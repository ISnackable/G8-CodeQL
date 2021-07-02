# Comparison of user-controlled data of different kinds
Many programmers mistakenly believe that information stored in cookies and hidden HTML form fields is tamper-proof and cannot be changed by the user. Hence they might try to verify other request data by comparing it against this information, for example by checking whether a user name embedded in a request parameter matches data stored in an (unsigned) cookie. In fact, however, all of these sources of data are user-controlled, so a malicious user can easily bypass such checks to gain unauthorized access to protected functionality or data.


## Recommendation
When checking whether a user is authorized for a particular activity, do not use data that is entirely controlled by that user in the permissions check. If necessary, always validate the input, ideally against a fixed list of expected values.

Similarly, do not decide which permission to check for, based on user data. In particular, avoid using computation to decide which permissions to check for. Use fixed permissions for particular actions, rather than generating the permission to check for.


## Example
In this example, we have a server that shows private information for a user, based on the request parameter `userId`. For privacy reasons, users may only view their own private information, so the server checks that the request parameter `userId` matches a cookie value for the user who is logged in.


```javascript
var express = require('express');
var app = express();
// ...
app.get('/full-profile/:userId', function(req, res) {

    if (req.cookies.loggedInUserId !== req.params.userId) {
        // BAD: login decision made based on user controlled data
        requireLogin();
    } else {
        // ... show private information
    }

});

```
This security check is, however, insufficient since an attacker can craft his cookie values to match those of any user. To prevent this, the server can cryptographically sign the security critical cookie values:


```javascript
var express = require('express');
var app = express();
// ...
app.get('/full-profile/:userId', function(req, res) {

    if (req.signedCookies.loggedInUserId !== req.params.userId) {
        // GOOD: login decision made based on server controlled data
        requireLogin();
    } else {
        // ... show private information
    }

});

```

## References
* Common Weakness Enumeration: [CWE-807](https://cwe.mitre.org/data/definitions/807.html).
* Common Weakness Enumeration: [CWE-290](https://cwe.mitre.org/data/definitions/290.html).
