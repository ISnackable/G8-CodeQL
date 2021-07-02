# Average cyclomatic complexity of files
This metric measures the average cyclomatic complexity of the functions in a file.

The cyclomatic complexity of a function is the number of linearly independent execution paths through that function. A path is linearly independent path if it differs from all other paths by at least one node. Straight-line code therefore has a cyclomatic complexity of one, while branches, switches and loops increase cyclomatic complexity.

Functions with a high cyclomatic complexity are typically hard to understand and test. By extension, files whose functions have a high average cyclomatic complexity are problematic, and usually would benefit from refactoring.

As a concrete example, consider the following function:


```javascript
function f(i, j) {
    // start
    var result;
    if(i % 2 == 0) {
        // iEven
        result = i + j;
    }
    else {
        // iOdd
        if(j % 2 == 0) {
            // jEven
            result = i * j;
        }
        else {
            // jOdd
            result = i - j;
        }
    }
    return result;
    // end
}
```
The control flow graph for this function is as follows:

![Control Flow Graph](./FCyclomaticComplexity_ControlFlow.png)The graph shows that the number of linearly independent execution paths through the function, and hence its cyclomatic complexity, is `3`. The three paths are:

* `start -> iEven -> end`
* `start -> iOdd -> jEven -> end`
* `start -> iOdd -> jOdd -> end`

## Recommendation
Functions with a high cyclomatic complexity should be simplified, for instance by tidying up any complex logic within them or by splitting them into multiple methods using the Extract Method refactoring.


## References
* M. Fowler, *Refactoring*. Addison-Wesley, 1999.
* T. J. McCabe, *A Complexity Measure*. IEEE Transactions on Software Engineering, SE-2(4), December 1976.
* Dave Thomas, [Refactoring as Meta Programming?](http://www.jot.fm/issues/issue_2005_01/column1/), in Journal of Object Technology, vol. 4, no. 1, January-February 2005, pp. 7-11.
* Wikipedia: [Cyclomatic complexity](http://en.wikipedia.org/wiki/Cyclomatic_complexity)
* Wikipedia: [Code refactoring](http://en.wikipedia.org/wiki/Code_refactoring)
