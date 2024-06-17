import { Box } from "@mui/material";
import { useMemo, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { PageSkeleton } from "./PageSkeleton";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { Toolbar } from "./Toolbar";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface Props {
  file: File;
  loading?: boolean;
  openHtml: () => void;
}

export const ContentPreview = ({ file, loading, openHtml }: Props) => {
  const contentFile = useMemo(() => file, [file]);
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [zoom, setZoom] = useState<number>(1);
  const [rotate, setRotate] = useState(0);
  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <Box
      sx={{
        background: "#F2F4FB",
        display: "flex",
        justifyContent: "center",
        padding: 3,
        minHeight: "100%",
      }}
    >
      <Box
        sx={{ position: "fixed", top: "70px", right: "20px", zIndex: "9999" }}
      >
        <Toolbar
          zoom={zoom}
          setZoom={setZoom}
          rotate={rotate}
          setRotate={setRotate}
          openHtml={openHtml}
        />
      </Box>
      <Document
        file={contentFile}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<PageSkeleton />}
        error={"Không thể hiển thị"}
      >
        <Page pageNumber={pageNumber} scale={zoom} rotate={rotate}></Page>
      </Document>
    </Box>
  );
};
