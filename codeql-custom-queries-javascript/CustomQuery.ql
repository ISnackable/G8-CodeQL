/**
* @name my-custom-query
* @description This is a custom query generated from the frontend web application. 
* @kind problem
* @problem.severity recommendation
* @percision high
* @id javascript/my-custom-query
* @tags custom
*/

import javascript
from BlockStmt b
where b.getNumStmt() = 0
select b, "This is an empty block."