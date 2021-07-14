import React from "react";
import { Button, Tooltip, OverlayTrigger } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
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

  const download = () => {
    if (id) {
      axios({
        url: `${backend_url}/snapshots/${id}`,
        method: "GET",
        responseType: "blob",
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
        );
    } else {
      alert("No project specified");
    }
  };

  return (
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
  );
};

export default DownloadCodeQLDatabaseButton;