/**
* @name my-custom-query
* @description This is a custom query generated from the frontend web application. 
* @kind path-problem
* @problem.severity recommendation
* @percision high
* @id javascript/my-custom-query
* @tags custom
*/

import javascript
import DataFlow::PathGraph
import semmle.javascript.security.dataflow.LogInjection::LogInjection

from LogInjectionConfiguration config, DataFlow::PathNode source, DataFlow::PathNode sink
where config.hasFlowPath(source, sink)
select sink.getNode(), source, sink, "$@ flows to log entry.", source.getNode(),"User-provided value"