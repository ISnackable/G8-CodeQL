import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
// import PdfDocument from "../PdfDocument";
import MyDocument from "./CodeQLAlertPDF";

const generatePdfDocument = async (documentData) => {
  const blob = await pdf(<MyDocument title="My PDF" />).toBlob();
  saveAs(blob, "test.pdf");
};

export default generatePdfDocument;
