import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "./CodeQLAlertPDF";

const PDFGenerator = () => {
  return (
    <PDFViewer style={{ width: "100%", height: "57em" }}>
      <MyDocument
        title="G8 Secure Source Code Review Report"
        author="G8"
        subject="Secure Source Code Review"
        keywords="Secure Code Review, CodeQL, G8"
        creator="G8"
        language="English"
      />
    </PDFViewer>
    // <div id="temp-snippet">Loading Snippets...</div>
  );
};

export default PDFGenerator;
