import {
  Box,
  Divider,
  Modal as ModalMUI,
  ModalTypeMap,
  Typography,
} from "@mui/material";
import React, { CSSProperties } from "react";
import { ComplexAction } from "./types";
import { animated, useSpring } from "@react-spring/web";
import { CloseOutlined } from "@mui/icons-material";
import { filterNonNull } from "../utils/base";
import { Button } from "./Button";
import { ButtonGroup } from "./ButonGroup";
import isElement from "lodash-es/isElement";

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

const style: CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  background: "#ffffff",
  boxShadow: "24",
  borderRadius: 2,
};

interface Props extends Pick<ModalTypeMap["props"], "open" | "onClose" | "sx"> {
  onBackdropClick?: () => void;
  size?: "xs" | "md" | "lg" | "xl";
  title?: string | React.ReactNode;
  primaryAction?: ComplexAction;
  secondaryActions?: ComplexAction[];
  hideClose?: boolean;
  children: React.ReactNode | React.ReactNode[];
  divider?: boolean;
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

const ModalHeader = ({
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

const MapSize = {
  xs: "300px",
  md: "500px",
  lg: "800px",
  xl: "1140px",
};

export const Modal = ({
  children,
  title,
  divider = true,
  open,
  size = "md",
  primaryAction,
  secondaryActions,
  ...props
}: Props) => {
  const headerMarkup = (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      minWidth={"0"}
      gap={(theme) => theme.spacing(3)}
      paddingX={2}
      paddingY={1}
      paddingRight={1}
    >
      <Box flex={"1 1 auto"}>
        {title &&
          (isElement(title) ? (
            <Typography component={"h3"} fontWeight={450}>
              {title}
            </Typography>
          ) : (
            <Box>{title}</Box>
          ))}
      </Box>
      {!props.hideClose && (
        <Box
          display={"flex"}
          onClick={(e) => {
            if (props?.onClose) props?.onClose(e, "backdropClick");
          }}
          sx={{
            ":hover": {
              cursor: "pointer",
              background: (theme) => theme.palette.grey[100],
              borderRadius: 1,
            },
          }}
        >
          <CloseOutlined />
        </Box>
      )}
    </Box>
  );

  const footerMarkup = filterNonNull<ComplexAction>([
    ...(secondaryActions?.map((item) => ({ ...item, outline: true })) || []),
    primaryAction ? { color: "primary", ...primaryAction } : null,
  ]).map((item, index) => <Button key={index} {...item} />);
  return (
    <ModalMUI open={open} onClose={props.onClose}>
      <Fade in={open}>
        <Box sx={{ ...style, width: MapSize[size] }}>
          {headerMarkup}
          {divider && <Divider />}
          {children}
          {footerMarkup ? (
            <ModalFooter>
              <ButtonGroup>{footerMarkup}</ButtonGroup>
            </ModalFooter>
          ) : null}
        </Box>
      </Fade>
    </ModalMUI>
  );
};

export default Object.assign(Modal, {
  Header: ModalHeader,
  Section: ModalSection,
  Footer: ModalFooter,
});
