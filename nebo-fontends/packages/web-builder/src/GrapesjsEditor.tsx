import { Editor, usePlugin } from "grapesjs";
import { useEffect, useMemo, useRef, useState, useContext } from "react";
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Col,
  Container,
  InputGroup,
  OverlayTrigger,
  Row,
  Stack,
  Tab,
  Tabs,
  Tooltip,
} from "react-bootstrap";
import $ from "jquery";
import { ToolButton, ToolButtonProps } from "./compoents/ToolButton";
import { ZoomButton } from "./compoents/ZoomButton";
import React from "react";
import { EditorContext } from "./context/EditorContext";

interface Props {
  designingMode?: boolean;
}

export const GrapesjsEditor = ({ designingMode = true }: Props) => {
  const { editor } = useContext(EditorContext);

  // useEffect(() => {
  //   if (editor !== null) context?.setEditor(editor);
  // }, [editor]);

  // useEffect(() => {
  //   // console.log(editor);
  //   setInterval(() => {
  //     console.log(editor);
  //   }, 1000);
  // }, [editor]);

  return <div></div>;
};
