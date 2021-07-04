# LDAP query built from user-controlled sources
If an LDAP query is built using string concatenation or string formatting, and the components of the concatenation include user input without any proper sanitization, a user is likely to be able to run malicious LDAP queries.


## Recommendation
If user input must be included in an LDAP query, it should be escaped to avoid a malicious user providing special characters that change the meaning of the query. In NodeJS, it is possible to build the LDAP query using frameworks like `ldapjs`. The library provides a `Filter API`, however it's still possibile to pass a string version of an LDAP filter. A good practice is to escape filter characters that could change the meaning of the query (https://tools.ietf.org/search/rfc4515\#section-3).


## Example
In the following examples, the code accepts a `username` from the user, which it uses in a LDAP query.

The first and the second example uses the unsanitized user input directly in the search filter for the LDAP query. A malicious user could provide special characters to change the meaning of these queries, and search for a completely different set of values.


```javascript
const http = require('http');
const url = require('url');
const ldap = require('ldapjs');
const client = ldap.createClient({
    url: 'ldap://127.0.0.1:1389'
});

const server = http.createServer((req, res) => {
    let q = url.parse(req.url, true);

    let username = q.query.username;

    var opts = {
        // BAD
        filter: `(|(name=${username})(username=${username}))`
    };

    client.search('o=example', opts, function (err, res) {

    });
});

```

```javascript
const http = require('http');
const url = require('url');
const ldap = require('ldapjs');
const client = ldap.createClient({
    url: 'ldap://127.0.0.1:1389'
});

const server = http.createServer((req, res) => {
    let q = url.parse(req.url, true);

    let username = q.query.username;

    // BAD
    client.search('o=example', { filter: `(|(name=${username})(username=${username}))` }, function (err, res) {
    });
});

```
In the third example the `username` is sanitized before it is included in the search filters. This ensures the meaning of the query cannot be changed by a malicious user.


```javascript
const http = require('http');
const url = require('url');
const ldap = require('ldapjs');
const client = ldap.createClient({
    url: 'ldap://127.0.0.1:1389'
});


// https://github.com/vesse/node-ldapauth-fork/commit/3feea43e243698bcaeffa904a7324f4d96df60e4
const sanitizeInput = function (input) {
    return input
        .replace(/\*/g, '\\2a')
        .replace(/\(/g, '\\28')
        .replace(/\)/g, '\\29')
        .replace(/\\/g, '\\5c')
        .replace(/\0/g, '\\00')
        .replace(/\//g, '\\2f');
};

const server = http.createServer((req, res) => {
    let q = url.parse(req.url, true);

    let username = q.query.username;

    // GOOD
    username = sanitizeInput(username);

    client.search('o=example', { filter: `(|(name=${username})(username=${username}))` }, function (err, res) {
    });

});

```
In the fourth example the `username` is passed to an `OrFilter` filter before it is included in the search filters. This ensures the meaning of the query cannot be changed by a malicious user.


```javascript
const http = require('http');
const url = require('url');
const ldap = require('ldapjs');
const client = ldap.createClient({
    url: 'ldap://127.0.0.1:1389'
});

const server = http.createServer((req, res) => {
    let q = url.parse(req.url, true);

    let username = q.query.username;

    // GOOD (https://github.com/ldapjs/node-ldapjs/issues/181)
    let f = new OrFilter({
        filters: [
            new EqualityFilter({
                attribute: 'name',
                value: username
            }),
            new EqualityFilter({
                attribute: 'username',
                value: username
            })
        ]
    });

    client.search('o=example', { filter: f }, function (err, res) {
    });
});

```

## References
* OWASP: [LDAP Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/LDAP_Injection_Prevention_Cheat_Sheet.html).
* LDAPjs: [Documentation for LDAPjs](http://ldapjs.org/index.html).
* Github: [ldapjs](https://github.com/ldapjs/node-ldapjs).
* Wikipedia: [LDAP injection](https://en.wikipedia.org/wiki/LDAP_injection).
* BlackHat: [LDAP Injection and Blind LDAP Injection](https://www.blackhat.com/presentations/bh-europe-08/Alonso-Parada/Whitepaper/bh-eu-08-alonso-parada-WP.pdf).
* LDAP: [Understanding and Defending Against LDAP Injection Attacks](https://ldap.com/2018/05/04/understanding-and-defending-against-ldap-injection-attacks/).
* Common Weakness Enumeration: [CWE-90](https://cwe.mitre.org/data/definitions/90.html).
