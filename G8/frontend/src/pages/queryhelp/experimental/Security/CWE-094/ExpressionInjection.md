# Expression injection in Actions
Using user-controlled input in GitHub Actions may lead to code injection in contexts like *run:* or *script:*.


## Recommendation
The best practice to avoid code injection vulnerabilities in GitHub workflows is to set the untrusted input value of the expression to an intermediate environment variable.


## Example
The following example lets a user inject an arbitrary shell command:


```yaml
on: issue_comment

jobs:
  echo-body:
    runs-on: ubuntu-latest
    steps:
    - run: |
        echo '${{ github.event.comment.body }}'
```
The following example uses shell syntax to read the environment variable and will prevent the attack:


```yaml
on: issue_comment

jobs:
  echo-body:
    runs-on: ubuntu-latest
    steps:
    - env:
        BODY: ${{ github.event.issue.body }}
      run: |
        echo '$BODY'
```

## References
* GitHub Security Lab Research: [Keeping your GitHub Actions and workflows secure: Untrusted input](https://securitylab.github.com/research/github-actions-untrusted-input).
* Common Weakness Enumeration: [CWE-94](https://cwe.mitre.org/data/definitions/94.html).
