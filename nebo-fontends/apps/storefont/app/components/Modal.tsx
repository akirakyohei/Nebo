import {
  Box,
  Modal as ModalMUI,
  ModalTypeMap,
  Typography,
} from "@mui/material";
import React from "react";
import { isElement } from "react-dom/test-utils";
import { ComplexAction } from "./types";
import { animated, useSpring } from "@react-spring/web";
interface FadeProps {
  children: React.ReactElement;
  in?: boolean;
  onClick?: any;
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
  onExited?: (node: HTMLElement, isAppearing: boolean) => void;
  ownerState?: any;
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(
  function Fade(props, ref) {
    const {
      children,
      in: open,
      onClick,
      onEnter,
      onExited,
      ownerState,
      ...other
    } = props;
    const style = useSpring({
      from: { opacity: 0 },
      to: { opacity: open ? 1 : 0 },
      onStart: () => {
        if (open && onEnter) {
          onEnter(null as any, true);
        }
      },
      onRest: () => {
        if (!open && onExited) {
          onExited(null as any, true);
        }
      },
    });

    return (
      <animated.div ref={ref} style={style} {...other}>
        {React.cloneElement(children, { onClick })}
      </animated.div>
    );
  }
);

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface Props
  extends Pick<ModalTypeMap["props"], "open" | "onClose" | "sx" | "children"> {
  onBackdropClick?: () => void;
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
  return <Box padding={!flush ? 2 : undefined}>{children}</Box>;
};

const ModalFooter = ({ children }: { children: React.ReactNode }) => {
  return <Box padding={2}>{children}</Box>;
};

export const Modal = ({ children, title, ...props }: Props) => {
  return (
    <ModalMUI open={props.open} onClose={props.onClose}>
      <Fade in={open}>
        <Box sx={{ ...style }}>
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
      </Fade>
    </ModalMUI>
  );
};

export default Object.assign(Modal, {
  Section: ModalSection,
  Footer: ModalFooter,
});
