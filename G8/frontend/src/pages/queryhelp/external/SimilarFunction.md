# Similar function
Duplicate functions with identical or very similar bodies indicate poorly structured code that is hard to maintain. The artificially inflated amount of code hinders comprehension, and ranges of similar but subtly different lines can mask the real purpose or intention behind a function. Duplicate functions can also suffer from update anomalies, where only one of several copies of the code is updated to address a defect or add a feature, causing them to slowly evolve apart.

In some cases, duplicate functions can also indicate a bug where a function was copied with the aim of changing it in some way, but the programmer then forgot to perform the intended change.


## Recommendation
At its simplest, function duplication can be addressed by removing all but one of the duplicate function definitions and making callers of the removed functions refer to the (now canonical) single remaining definition instead.

If two functions are mostly, but not completely, identical, it is often possible to factor out the common functionality into a new function. This improves reusability and resolves the code duplication.


## References
* Elmar Juergens, Florian Deissenboeck, Benjamin Hummel, and Stefan Wagner. 2009. Do code clones matter? In *Proceedings of the 31st International Conference on Software Engineering* (ICSE '09). IEEE Computer Society, Washington, DC, USA, 485-495.
