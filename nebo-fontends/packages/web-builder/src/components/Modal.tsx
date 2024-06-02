import * as React from "react";
import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import { Modal as ModalMUI, ModalProps } from "@mui/material";
import { cx } from "./common";
import { Component, State } from "grapesjs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  border: "2px solid #000",
  boxShadow: 24,
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  maxHeight: "90vh",
  p: 2,
};

interface CustomModalProps {
  /**
   * Modal title
   */
  title: React.ReactElement;
  /**
   * Modal content
   */
  content: React.ReactElement;
  /**
   * Modal attributes
   */
  attributes?: Record<string, any>;
  /**
   * Callback for closing the modal
   */
  close: () => void;
  open: boolean;
}

export default function Modal({
  content,
  title,
  close,
  attributes,
  ...props
}: CustomModalProps) {
  // const ref = React.useRef<HTMLDivElement>(null);
  // const [htmlContent, setHtmlContent] = React.useState("");
  // React.useEffect(() => {
  //   return () => {
  //     if (ref.current !== null && ref.current.hasChildNodes()) {
  //       const child = ref.current.firstElementChild;
  //       setHtmlContent(child?.innerHTML || "");
  //     }
  //   };
  // }, [ref.current]);

  return (
    <ModalMUI onClose={close} {...props}>
      <Fade in={props.open}>
        <Box sx={style} className={cx("rounded")}>
          <div className="flex pb-3">
            <div className="flex-grow text-lg">{title}</div>
            <div onClick={close} className="cursor-pointer">
              <Icon size={1} path={mdiClose} />
            </div>
          </div>
          <div className="flex-grow overflow-y-auto">
            {typeof content === "string" ? (
              <div dangerouslySetInnerHTML={{ __html: content }}></div>
            ) : (
              content
            )}
          </div>
        </Box>
      </Fade>
    </ModalMUI>
  );
}
