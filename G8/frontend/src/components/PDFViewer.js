import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "./CodeQLAlertPDF";

const PDFGenerator = () => {
  return (
    <PDFViewer style={{ width: "100%", height: "57em" }}>
      <MyDocument />
    </PDFViewer>
    // <div id="temp-snippet">Loading Snippets...</div>
  );
};

export default PDFGenerator;
