import grapesjs, { Editor, usePlugin } from "grapesjs";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
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
import { Toolbar } from "./compoents/Toolbar";

import "./style.scss";
import blockBasicPlugin from "grapesjs-blocks-basic";
// import blockFlexPlugin from "grapesjs-blocks-flexbox";
// import typedPlugin from "grapesjs-typed";
// import customCodePlugin from "grapesjs-custom-code";
import styleGradientPlugin from "grapesjs-style-gradient";
import imageEditorPlugin from "grapesjs-tui-image-editor";
import rulersPlugin from "grapesjs-rulers";
import ckePlugin from "grapesjs-plugin-ckeditor";
import styleBgPlugin from "grapesjs-style-bg";
import borderPlugin from "grapesjs-style-border";
import iconPlugin from "grapesjs-icons";
import zoomPlugin from "./plugins/zoom";
import draggableDocumentPlugin from "./plugins/draggable-document";
import barcodePlugin from "./plugins/barcode/barcode";
import { EditorContext } from "./context/EditorContext";

export const ckeConfig = {
  toolbar: [
    { name: "document", items: ["Source"] },
    { name: "editing", items: ["SelectAll", "-"] },
    {
      name: "forms",
      items: ["Form", "Checkbox", "Radio", "TextField", "Textarea"],
    },
    {
      name: "basicstyles",
      items: [
        "Bold",
        "Italic",
        "Underline",
        "Strike",
        "Subscript",
        "Superscript",
        "-",
        "CopyFormatting",
        "RemoveFormat",
      ],
    },
    {
      name: "paragraph",
      items: [
        "NumberedList",
        "BulletedList",
        "-",
        "Outdent",
        "Indent",
        "-",
        "Blockquote",
        "CreateDiv",
        "-",
        "JustifyLeft",
        "JustifyCenter",
        "JustifyRight",
        "JustifyBlock",
        "-",
        "BidiLtr",
        "BidiRtl",
        "Language",
      ],
    },
    "/",
    {
      name: "insert",
      items: [
        "Image",
        "Table",
        "HorizontalRule",
        "Smiley",
        "SpecialChar",
        "PageBreak",
      ],
    },
    { name: "styles", items: ["Styles", "Format", "Font", "FontSize"] },
    { name: "colors", items: ["TextColor", "BGColor"] },
    { name: "tools", items: ["Maximize", "ShowBlocks"] },
    { name: "about", items: ["About"] },
  ],
};

interface Props {
  designingMode?: boolean;
  width?: string;
  height?: string;
}

const initGrapesjs = ({ width, height }: Props) => {
  const editor: Editor = grapesjs.init({
    container: "#nebo-editor",
    blockManager: {
      appendTo: "#nebo-block",
    },
    styleManager: {
      appendTo: "#nebo-style",
    },
    layerManager: {
      appendTo: "#nebo-layer",
    },
    traitManager: {
      appendTo: "#nebo-trait",
    },
    selectorManager: {
      appendTo: "#nebo-selector",
    },
    storageManager: {
      type: "local",
    },
    fromElement: true,
    deviceManager: {
      devices: [
        {
          name: "custom",
          width: width || "100vw",
          height: height || "900vh",
        },
      ],
    },
    height: "100%",
    pageManager: {},
    showDevices: false,
    panels: {
      defaults: [{}],
    },
    plugins: [
      usePlugin(blockBasicPlugin, {
        category: "Nội dung",
        blocks: ["text", "image"],
        flexGrid: true,
      }),
      usePlugin(blockBasicPlugin, {
        category: "Bố cục",
        blocks: ["column1", "column2", "column3"],
        flexGrid: true,
      }),
      styleGradientPlugin,
      usePlugin(imageEditorPlugin, {
        config: {
          includeUI: {
            initMenu: "filter",
          },
        },
      }),
      styleBgPlugin,
      borderPlugin,
      usePlugin(rulersPlugin, { rulerHeight: 20, dragMode: "absolute" }),
      usePlugin(iconPlugin, {
        block: {
          category: "Nội dung",
        },
        collections: [
          "ri", // Remix Icon by Remix Design,
          "mdi", // Material Design Icons by Pictogrammers
          "uim", // Unicons Monochrome by Iconscout
          "streamline-emojis", // Streamline Emojis by Streamline
        ],
      }),
      usePlugin(barcodePlugin, { blockBarcode: { category: "Nội dung" } }),
      usePlugin(zoomPlugin),
      usePlugin(draggableDocumentPlugin),
      usePlugin(ckePlugin, {
        ckeditor: "https://cdn.ckeditor.com/4.14.0/standard-all/ckeditor.js",
        options: ckeConfig,
      }),
    ],
  });

  $(".panel__devices").html("");
  $(".panel__basic-actions").html("");
  $(".panel__editor").html("");
  $("#nebo-block").html("");
  $("#nebo-style").html("");
  $("#nebo-layer").html("");
  $("#nebo-trait").html("");
  $("#nebo-selector").html("");

  // Add gradient picker as a single input
  editor.StyleManager.addProperty("decorations", {
    type: "gradient", // <- new type
    name: "Gradient",
    property: "background-image",
    defaults: "none",
    full: true,
  });

  // Add the new background-image bulti-in type
  editor.StyleManager.addProperty("decorations", {
    extend: "background-image", // <- extend the built-in type
    name: "Gradient Background",
  });
  editor.on("run:preview", () => editor.stopCommand("ruler-visibility"));

  editor.onReady(() => {
    editor.render();
  });
  return editor;
};

export const WebBuilderContainer = ({
  designingMode = true,
  width = "210mm",
  height = "594mm",
}: Props) => {
  // const editor = useEditor({ width: "210mm", height: "594mm" });
  const [editorContext, setEditorContext] = useState<Editor | null>(null);

  const setContext = useCallback(
    (_editor: Editor) => {
      // setEditorContext((prev) => {
      //   if (prev !== null) return { ...prev, ..._editor } as Editor;
      //   return _editor;
      // });
      setEditorContext(_editor);
    },
    [editorContext, setEditorContext]
  );

  const getContextValue = useCallback(
    () => ({
      editor: editorContext,
    }),
    [editorContext]
  );

  useEffect(() => {
    if (!editorContext) {
      var editor = initGrapesjs({ width, height });
      setContext(editor);
    }
  }, [width, height, editorContext]);

  useEffect(() => {
    return () => {
      if (editorContext) {
        const index = grapesjs.editors.findIndex(
          (e) => e.Config.container === editorContext.Config.container
        );
        if (typeof index !== "number" && index >= 0) {
          grapesjs.editors.splice(index, 1);
        }
        editorContext.destroy();
      }
    };
  }, [editorContext]);

  return (
    <div id="nebo-container">
      <EditorContext.Provider value={getContextValue()}>
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
                <div id="nebo-editor">
                  <GrapesjsEditor />
                </div>
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

        <div id="nebo-selector" className="d-none"></div>
      </EditorContext.Provider>
    </div>
  );
};

export default WebBuilderContainer;
