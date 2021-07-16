import React, { useState } from "react";
import { Button, Tooltip, OverlayTrigger } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import Progress from "./Progress";
import axios from "axios";

const backend_url =
  process.env.NODE_ENV === "production"
    ? "/g8/api"
    : `http://localhost:8080/g8/api`;

function getFileNameFromContentDisposition(contentDisposition) {
  if (!contentDisposition) return null;

  const match = contentDisposition.match(/filename="?([^"]+)"?/);

  return match ? match[1] : null;
}

const DownloadCodeQLDatabaseButton = (props) => {
  const { id } = props;
  const [progress, setProgress] = useState("0");
  const [show, setShow] = useState(false);

  const download = () => {
    if (id) {
      setShow(true);
      axios({
        url: `${backend_url}/snapshots/${id}`,
        method: "GET",
        responseType: "blob",
        onDownloadProgress: (progressEvent) => {
          let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
        }
      })
        .then((response) => {
          const actualFileName = getFileNameFromContentDisposition(
            response.headers["content-disposition"]
          );

          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",
            actualFileName ?? `database${id}.zip`
          );
          document.body.appendChild(link);
          link.click();
        })
        .catch((error) =>
          alert(`Error downloading database${id} snapshot`)
        ).finally(() => {
          setShow(false)
          setProgress("0");
        });
    } else {
      alert("No project specified");
    }
  };

  return (
    <>
      <OverlayTrigger
        placement="bottom"
        trigger={["hover", "focus"]}
        overlay={
          <Tooltip>
            Download CodeQL databases (QL snapshots) to query offline
          </Tooltip>
        }
      >
        <Button variant="outline-primary" className="m-1" onClick={download}>
          <FontAwesomeIcon icon={faDownload} className="me-2" /> Download
        </Button>
      </OverlayTrigger>
      {show && <Progress variant="primary" value={progress} />}
    </>
  );
};

export default DownloadCodeQLDatabaseButton;