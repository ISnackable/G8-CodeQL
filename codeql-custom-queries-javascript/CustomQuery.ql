/**
* @kind path-problem
* @id your-query-id
*/
import javascript
import semmle.javascript.security.dataflow.CodeInjection::CodeInjection
import DataFlow::PathGraph
    
from Configuration cfg, DataFlow::PathNode source, DataFlow::PathNode sink
where cfg.hasFlowPath(source, sink)
select sink.getNode(), source, sink,
"$@ flows to " + sink.getNode().(Sink).getMessageSuffix() + ".", source.getNode(),
"User-provided value"
    
    
    