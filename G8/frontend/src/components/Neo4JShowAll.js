// import React, { useEffect, useRef } from "react";
// import vis from "vis-network";

// // function setWindowDimensions(){
// //   const[windowDimensions,setWindowDimensions]= useState(getWindowDimension)
// //   useEffect(()=>{
// //     function handleResize(){
// //       setWindowDimensions(getWindowDimensions());
// //     }
// //     window.addEventListener('resize',handleResize);
// //     return ()=> window.removeEventListener('resize',handleResize);
// //   },[]);
// //   return windowDimensions;
// // }

// var LENGTH_MAIN=350;
// var LENGTH_SERVER=150;
// var LENGTH_SUB=50;
// var WIDTH_SCALE = 2;
// var GREEN="green";
// var GRAY= "gray";
// var BLACK = "#2B1B17";

// function VisNetwork(){
//   const graph={
//     nodes:[
//       {id:1,label:"Node 1", group:"query",title:"Node 1 tooip text"},
//       {id:2,label:"Node 2", group:"query",title:"Node 2 tooip text"},
//       {id:3,label:"Node 3", group:"query",title:"Node 3 tooip text"},
//       {id:4,label:"Node 4", group:"query",title:"Node 4 tooip text"},
//       {id:5,label:"Node 5", group:"query",title:"Node 5 tooip text"},
//     ],
//     edges:[
//       {from:1, to:2},
//       {from:2, to:3},
//       {from:3, to:4},
//       {from:4, to:5},
//     ]
//   }
//   // graph.edges.forEach((relation)=>{
//   //   relation.width=WIDTH_SCALE*4
//   // });
//   // const {height,width}=useWindowDimensions();
//   // const height=1000
//   // const width=500
//   // var x=width/2;
//   // var y=height/1000;
//   // var step=70;
//   // graph.nodes.push({
//   //   id:1000,
//   //   x:x,
//   //   y:y,
//   //   label: "Query"
//   // })
//   var network = new vis.Network(this.refs.ShowAllNeo4J, graph);
//   return <div ref="ShowAllNeo4J"></div>
// }

// export default VisNetwork


import React from "react";
import ReactDOM from "react-dom";
import Graph from "react-graph-vis";
 
// import "./styles.css";
// // need to import the vis network css in order to show tooltip
// import "./network.css";
 
function Neo4JShowAll() {
  const graph = {
    nodes: [
      { id: 1, label: "Node 1", title: "node 1 tootip text" },
      { id: 2, label: "Node 2", title: "node 2 tootip text" },
      { id: 3, label: "Node 3", title: "node 3 tootip text" },
      { id: 4, label: "Node 4", title: "node 4 tootip text" },
      { id: 5, label: "Node 5", title: "node 5 tootip text" }
    ],
    edges: [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 2, to: 5 }
    ]
  };
 
  const options = {
    layout: {
      hierarchical: false
    },
    edges: {
      color: "#000000"
    },
    height: "500px"
  };
 
  const events = {
    select: function(event) {
      var { nodes, edges } = event;
    }
  };
  return (
    <Graph
      graph={graph}
      options={options}
      events={events}
      getNetwork={network => {
        //  if you want access to vis.js network api you can set the state in a parent component using this property
      }}
    />
  );
}
export default Neo4JShowAll