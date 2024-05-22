import { Editor, usePlugin } from "grapesjs";
import { useEffect, useMemo, useRef, useState } from "react";
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
import { GrapesjsEditor } from "./GrapesjsEditor";
import { useEditor } from "./useEditor";
import { EditorContextProvider } from "./context/EditorContext";
import { Toolbar } from "./compoents/Toolbar";

interface Props {
  designingMode?: boolean;
}

export const WebBuilderContainer = ({ designingMode = true }: Props) => {
  // const editor = useEditor();

  return (
    <div id="nebo-container">
      <EditorContextProvider>
        <Container fluid className="p-0 nebo-layout-container">
          {designingMode ? (
            <div className="nebo-layout-row">
              <div className="p-0 nebo-layout-col">
                <Tabs
                  fill
                  defaultValue="block"
                  className="nebo-pn-left-container rounded-0"
                >
                  <Tab eventKey="block" title="Thêm">
                    <div id="nebo-block"></div>
                  </Tab>
                  <Tab eventKey="style" title="Thuộc tính">
                    <div id="nebo-style"></div>
                  </Tab>
                </Tabs>
              </div>
              <div className="p-0 border border-1 flex-fill">
                <div id="nebo-options">
                  <Toolbar />
                </div>
                <div id="nebo-editor"></div>
              </div>
              <div className="p-0 nebo-layout-col">
                <Tabs
                  fill
                  defaultValue="data"
                  className="nebo-pn-right-container"
                >
                  <Tab eventKey="data" title="Dữ liệu">
                    <div id="nebo-data"></div>
                  </Tab>
                  <Tab eventKey="layer" title="Cấu trúc">
                    <div id="nebo-layer"></div>
                  </Tab>
                  <Tab eventKey="trait" title="Đặc điểm">
                    <div id="nebo-trait"></div>
                  </Tab>
                </Tabs>
              </div>
            </div>
          ) : (
            <>
              <div id="nebo-editor"></div>
              <div id="nebo-options"></div>
              <div id="nebo-block"></div>
              <div id="nebo-style"></div>
              <div id="nebo-data"></div>
              <div id="nebo-layer"></div>
              <div id="nebo-trait"></div>
            </>
          )}
        </Container>
        <GrapesjsEditor />
        <div id="nebo-selector" className="d-none"></div>
      </EditorContextProvider>
    </div>
  );
};

export default WebBuilderContainer;
