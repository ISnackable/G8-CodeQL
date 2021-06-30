# Similar script
Duplicate scripts with identical or very similar contents indicate poorly structured code that is hard to maintain. The artificially inflated amount of code hinders comprehension, and ranges of similar but subtly different lines can mask the real purpose or intention behind a function. Duplicate scripts can also suffer from update anomalies, where only one of several copies of the code is updated to address a defect or add a feature, causing them to slowly evolve apart.


## Recommendation
Usually, script duplication can be addressed by removing all but one of the duplicates and including the (now canonical) single remaining script wherever the other scripts were previously used.

If the scripts are mostly, but not completely, identical, it is often possible to factor out the common functionality into a new script. This improves reusability and resolves the code duplication.


## References
* Elmar Juergens, Florian Deissenboeck, Benjamin Hummel, and Stefan Wagner. 2009. Do code clones matter? In *Proceedings of the 31st International Conference on Software Engineering* (ICSE '09). IEEE Computer Society, Washington, DC, USA, 485-495.
