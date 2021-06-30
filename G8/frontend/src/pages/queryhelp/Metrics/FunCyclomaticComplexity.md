# Cyclomatic complexity of functions
This metric measures the cyclomatic complexity of each function in the project.

The cyclomatic complexity of a function is an indication of the number of paths that can be taken during the execution of a function. Code with many branches and loops has high cyclomatic complexity. A cyclomatic complexity above 50 should be considered bad practice and above 75 should definitely be addressed.

Functions with high cyclomatic complexity are

* difficult to test since tests should be provided for each possible execution path;
* difficult to understand since a developer needs to understand how all conditions interact;
* difficult to maintain since many execution paths is an indication of functions that perform too many tasks.

## Recommendation
The primary way to reduce the complexity is to extract sub-functionality into separate functions. This improves on all problems described above. If the function naturally breaks up into a sequence of operations it is preferable to extract each operation as a separate function. Even if that's not the case it is often possible to extract the body of an iteration into a separate function to reduce complexity. If the complexity can't be reduced significantly make sure that the function is properly documented and carefully tested.


## References
* M. Fowler. *Refactoring*. Addison-Wesley, 1999.
* T. J. McCabe. *A Complexity Measure*. IEEE Transactions on Software Engineering, SE-2(4), December 1976.
* Wikipedia: [Cyclomatic complexity](http://en.wikipedia.org/wiki/Cyclomatic_complexity).
