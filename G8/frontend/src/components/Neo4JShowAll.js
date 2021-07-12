import axios from "axios";
import React, { useEffect } from "react";
import Graph from "react-graph-vis";
import useLocalStorageState from "use-local-storage-state";

const backend_url =
  process.env.NODE_ENV === "production"
    ? "/g8/api"
    : `http://localhost:8080/g8/api`;

function Neo4JShowAll() {
  // eslint-disable-next-line no-unused-vars
  const [projectInfo, setprojectInfo] = useLocalStorageState("projectInfo", []);
  const [Neo4JGraph, setNeo4JGraph] = React.useState({
    nodes: [
      { id: 1, label: "Node 1", title: "node 1 tootip text" },
      { id: 2, label: "Node 2", title: "node 2 tootip text" },
      { id: 3, label: "Node 3", title: "node 3 tootip text" },
      { id: 4, label: "Node 4", title: "node 4 tootip text" },
      { id: 5, label: "Node 5", title: "node 5 tootip text" },
    ],
    edges: [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
    ],
  });
  useEffect(() => {
    console.log(projectInfo[0]?.id);
    axios
      .get(`${backend_url}/neo4jshowallinproject/${projectInfo[0]?.id}`)
      .then((response) => {
        var graph3 = {
          nodes: [],
          edges: [],
        };
        response.data.nodes.forEach((single_node) => {
          graph3.nodes.push(single_node);
        });
        response.data.edges.forEach((single_edge) => {
          graph3.edges.push(single_edge);
        });
        setNeo4JGraph(response.data);
      })
      .catch((error) => {
        alert("error loading neo4j graph.");
      });
  }, [projectInfo]);
  const options = {
    layout: {
      hierarchical: { enabled: false },
    },
    groups: {
      CodeFlows: {
        //Insert CodeFlows customization here
        color: "#c3baba",
        shape: "text",
      },
      Alert: {
        //Insert Alert customization here
        color: "#e35959",
        shape: "box",
      },
      Query: {
        //Insert Query customization here
        color: "#8beacf",
        shape: "ellipse",
      },
      File: {
        //Insert File customization here
        color: "#f9ec6d",
        shape: "circle",
      },
    },
    nodes: {
      scaling: { min: 16, max: 32 },
    },
    edges: {
      color: "#000000",
      smooth: false,
    },
    height: "700px",
  };

  const events = {
    select: function (event) {
      // TODO: REMOVE IN THE FUTURE? NOT USED
      // eslint-disable-next-line no-unused-vars
      var { nodes, edges } = event;
    },
  };

  console.log(Neo4JGraph);
  return (
    <Graph
      graph={Neo4JGraph}
      options={options}
      events={events}
      // getNetwork={network => {
      //   //  if you want access to vis.js network api you can set the state in a parent component using this property
      // }}
    />
  );
}
export default Neo4JShowAll;
