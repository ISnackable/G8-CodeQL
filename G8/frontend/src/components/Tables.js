import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExternalLinkAlt,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Card,
  Button,
  Table,
  Spinner,
} from "@themesberg/react-bootstrap";
import commands from "../data/commands";
import axios from "axios";
import useLocalStorageState from "use-local-storage-state";

const backend_url =
  process.env.NODE_ENV === "production"
    ? "/g8/api"
    : `http://localhost:8080/g8/api`;

// const ValueChange = ({ value, suffix }) => {
//   const valueIcon = value < 0 ? faAngleDown : faAngleUp;
//   const valueTxtColor = value < 0 ? "text-danger" : "text-success";

//   return value ? (
//     <span className={valueTxtColor}>
//       <FontAwesomeIcon icon={valueIcon} />
//       <span className="fw-bold ms-1">
//         {Math.abs(value)}
//         {suffix}
//       </span>
//     </span>
//   ) : (
//     "--"
//   );
// };

export const CommandsTable = () => {
  const TableRow = (props) => {
    const { name, usage = [], description, link } = props;

    return (
      <tr>
        <td className="border-0" style={{ width: "5%" }}>
          <code>{name}</code>
        </td>
        <td className="fw-bold border-0" style={{ width: "5%" }}>
          <ul className="ps-0">
            {usage.map((u) => (
              <ol key={u} className="ps-0">
                <code>{u}</code>
              </ol>
            ))}
          </ul>
        </td>
        <td className="border-0" style={{ width: "50%" }}>
          <pre className="m-0 p-0">{description}</pre>
        </td>
        <td className="border-0" style={{ width: "40%" }}>
          <pre>
            <Card.Link href={link} target="_blank">
              Read More{" "}
              <FontAwesomeIcon icon={faExternalLinkAlt} className="ms-1" />
            </Card.Link>
          </pre>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body className="p-0">
        <Table
          responsive
          className="table-centered rounded"
          style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
        >
          <thead className="thead-light">
            <tr>
              <th className="border-0" style={{ width: "5%" }}>
                Name
              </th>
              <th className="border-0" style={{ width: "5%" }}>
                Usage
              </th>
              <th className="border-0" style={{ width: "50%" }}>
                Description
              </th>
              <th className="border-0" style={{ width: "40%" }}>
                Extra
              </th>
            </tr>
          </thead>
          <tbody>
            {commands.map((c) => (
              <TableRow key={`command-${c.id}`} {...c} />
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const ExistingProjectTable = (props) => {
  //Creates state variables
  let [responseData, setResponseData] = React.useState([]);
  // eslint-disable-next-line no-unused-vars
  const [logs, setLogs] = useLocalStorageState("log", []);
  // eslint-disable-next-line no-unused-vars
  const [projectInfo, setprojectInfo] = useLocalStorageState("projectInfo", []);
  const fetchData = (e) => {
    if (e) e.preventDefault();
    axios
      .get(backend_url + `/projects`)
      .then((response) => {
        setResponseData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // useEffect with empty array to run once after component is mounted
  useEffect(() => {
    fetchData();
    var autoupdate = setInterval(() => fetchData(), 3000);
    return () => {
      clearInterval(autoupdate);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const startAnalyse = (e) => {
    e.preventDefault();
    // console.log(e.target.value); //This console logs the id
    axios
      .post(backend_url + `/analyses/` + e.target.value)
      .then((response) => {
        alert("Success. Project has been analyzed!");
      })
      .catch((error) => {
        alert("Error: " + error);
      });
  };
  const deleteprojectbyid = (e) => {
    e.preventDefault();
    // console.log(e.currentTarget.value ?? e.target.value); //This console logs the id
    axios
      .delete(
        backend_url + `/projects/` + (e.currentTarget.value ?? e.target.value)
      )
      .then((response) => {
        alert("Success. Project has been deleted!");
      })
      .catch((error) => {
        alert("Error: " + error);
      });
  };
  const loadProject = (e) => {
    e.preventDefault();
    // console.log(e.target.value); //This console logs the id
    axios
      .get(backend_url + `/analyses/` + e.target.value)
      .then((response) => {
        setLogs([response.data]);
        responseData.forEach((item) => {
          // eslint-disable-next-line eqeqeq
          if (item.id == e.target.value) {
            setprojectInfo([
              {
                id: item.id,
                project_name: item.project_name,
                hash: item.hash,
                sarif_filename: item.sarif_filename,
                created_at: item.created_at,
              },
            ]);
          }
        });

        alert("Project has been successfully loaded");
      })
      .catch((error) => {
        alert("Error: " + error);
      });
  };

  const TableRow = (props) => {
    var { id, project_name, hash, sarif_filename, created_at } = props;
    const buildsarifbutton = (id, type, sarif_filename) => {
      var color = "";
      var msg = "";
      var functiontocall;
      if (type === 2) {
        color = "success";
        msg = "Load Project ";
        functiontocall = loadProject;
      } else if (type === 0) {
        color = "danger";
        msg = "Analyse Project";
        functiontocall = startAnalyse;
      } else if (type === 1) {
        color = "secondary";
        msg = "Processing";
        functiontocall = fetchData;
      } else if (type === 3) {
        color = "danger";
        msg = "Error";
        functiontocall = fetchData;
      } else {
        color = "muted";
        msg = "Broken";
      }
      return (
        <Button
          variant={color}
          size="sm"
          value={id}
          onClick={(e) => functiontocall(e, "value")}
          aria-label="project"
        >
          {type === 1 && (
            <Spinner animation="border" role="status" size="sm" as="span">
              <span className="sr-only">Processing...</span>
            </Spinner>
          )}{" "}
          {msg}
        </Button>
      );
    };

    const builddeletebutton = (id, type) => {
      if (type === 1) {
        return (
          <Button
            variant="danger"
            value={id}
            onClick={(e) => deleteprojectbyid(e)}
            aria-label="delete"
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </Button>
        );
      } else {
        return (
          <Button
            variant="dark"
            value={id}
            onClick={(e) =>
              alert(
                "Project Cannot be deleted while processing. Please do it manually on the backend."
              )
            }
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </Button>
        );
      }
    };
    var delete_button;
    if (sarif_filename == null) {
      delete_button = builddeletebutton(id, 1);
      sarif_filename = buildsarifbutton(id, 0, sarif_filename);
    } else if (sarif_filename === "processing") {
      delete_button = builddeletebutton(id, 0);
      sarif_filename = buildsarifbutton(id, 1, sarif_filename);
    } else if (sarif_filename === "error") {
      delete_button = builddeletebutton(id, 1);
      sarif_filename = buildsarifbutton(id, 3, sarif_filename);
    } else {
      delete_button = builddeletebutton(id, 1);
      sarif_filename = buildsarifbutton(id, 2, sarif_filename);
    }

    return (
      <tr>
        <th scope="row">{id}</th>
        <td>{project_name}</td>
        <td>{hash}</td>
        <td>{created_at}</td>
        <td>{sarif_filename}</td>
        <td>{delete_button}</td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header>
        <Row className="align-items-center">
          <Col>
            <h5>Existing Projects List</h5>
          </Col>
          <Col className="text-end">
            <Button variant="secondary" size="sm" onClick={fetchData}>
              Update
            </Button>
          </Col>
        </Row>
      </Card.Header>
      <Table hover responsive className="align-items-center table-flush">
        <thead className="thead-light">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Project Title</th>
            <th scope="col">Checksum</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {responseData.map((pv) => (
            <TableRow key={pv.id} {...pv} />
          ))}
        </tbody>
      </Table>
    </Card>
  );
};
