import {
  Box,
  Modal as ModalMUI,
  ModalTypeMap,
  Typography,
} from "@mui/material";
import React from "react";
import { isElement } from "react-dom/test-utils";
import { ComplexAction } from "./types";

interface Props
  extends Pick<ModalTypeMap["props"], "open" | "onClose" | "sx" | "children"> {
  onBackdropClick: () => void;

  size?: "small" | "medium" | "large";
  title?: string | React.ReactNode;
  primary?: ComplexAction;
  secondary?: ComplexAction[];
}
const ModalSection = ({
  flush,
  children,
}: {
  flush?: boolean;
  children: React.ReactNode;
}) => {
  return <Box letterSpacing={!flush ? 2 : undefined}>{children}</Box>;
};

const ModalFooter = ({ children }: { children: React.ReactNode }) => {
  return <Box letterSpacing={2}>{children}</Box>;
};

export const Modal = ({ children, title, ...props }: Props) => {
  return (
    <ModalMUI open={props.open} onClose={props.onClose}>
      <Box>
        {title &&
          (isElement(title) ? (
            <Typography component={"h3"} fontWeight={450}>
              {title}
            </Typography>
          ) : (
            <Box>{title}</Box>
          ))}
        {children}
      </Box>
    </ModalMUI>
  );
};

export default Object.assign(Modal, {
  Section: ModalSection,
  Footer: ModalFooter,
});
