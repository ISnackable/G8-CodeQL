# Number of statements in files
This metric measures the number of statements in a file.

If there are too many statements in a file, it is generally for one of two reasons:

* One or more individual functions in the file contain too many statements, making them hard to understand, difficult to check and a common source of defects. These functions typically lack cohesion because they are trying to do too many things.
* The file contains too many functions, which generally indicates that it is trying to do too much, either at the interface or implementation level or both. It can be difficult for readers to understand because there is a confusing list of operations.

## Recommendation
Long individual functions should be refactored into multiple, smaller parts. Files that contain many functions should be split up into smaller, more coherent units.


## References
* M. Fowler. *Refactoring*. Addison-Wesley, 1999.
