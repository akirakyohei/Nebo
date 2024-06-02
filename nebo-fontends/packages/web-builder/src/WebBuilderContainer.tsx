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
import GjsEditor, {
  AssetsProvider,
  BlocksProvider,
  Canvas,
  LayersProvider,
  StylesProvider,
  TraitsProvider,
  ModalProvider,
  WithEditor,
} from "@grapesjs/react";
import $ from "jquery";
import { ToolButton, ToolButtonProps } from "./components/ToolButton";
import { ZoomButton } from "./components/ZoomButton";
import { Toolbar } from "./components/Toolbar";

import "./style.scss";
import blockBasicPlugin from "grapesjs-blocks-basic";
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
import qrcodePlugin from "./plugins/qrcode/qrcode";
import gridSystemPlugin from "./plugins/grid-system/grid-system";
import { EditorContext } from "./context/EditorContext";
import { Template } from "./types/template";
import BlockManager from "./components/BlockManager";
import Modal from "./components/Modal";
import AssetManager from "./components/AssetManager";
import { createTheme, ThemeProvider } from "@mui/material";
import StyleManager from "./components/StyleManager";
import LayerManager from "./components/LayerManager";
import TraitManager from "./components/TraitManger";
// import ModalProvider from "./components/ModalProvider";
import { Unit, convertUnits } from "@karibash/pixel-units";
import { split_unit } from "./utils";

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
      items: ["Table", "HorizontalRule", "Smiley", "SpecialChar", "PageBreak"],
    },
    { name: "styles", items: ["Styles", "Format", "Font", "FontSize"] },
    { name: "colors", items: ["TextColor", "BGColor"] },
    { name: "tools", items: ["Maximize", "ShowBlocks"] },
    { name: "about", items: ["About"] },
  ],
};

export type Data = {
  assets: string[];
  components: any;
  css?: string;
  styles: any;
  html: string;
};

interface Props {
  designingMode?: boolean;
  template: Template;
  onUpdate?: (id: number, _value: Data) => void;
}

const theme = createTheme({});

export const WebBuilderContainer = ({
  designingMode = true,
  template,
  onUpdate,
}: Props) => {
  const options = useMemo(() => {
    const widthPx = convertUnits(template.options.width as any, "px");
    const width = split_unit(widthPx);
    const heightPx = convertUnits(template.options.height as any, "px");
    const height = split_unit(heightPx);
    return {
      storageManager: {
        // type: "remote-local",
        type: "local",
        autosave: true,
        autoload: true,
        stepsBeforeSave: 1,
        options: {
          local: {
            key: `nebo-project-${template.id}`,
          },
          remote: {},
        },
      },
      // fromElement: true,
      selectorManager: { componentFirst: true },
      deviceManager: {
        devices: [
          {
            name: "Desktop",
            width: `${Math.round(Number(width.value || 100))}`,
            height: `${Math.round(Number(height.value || 100))}`,
          },
        ],
      },
      // assetManager: {},
      protectedCss: `body { margin: ${template.options.margin.top} ${template.options.margin.right} ${template.options.margin.bottom} ${template.options.margin.left};}`,
      // pageManager: {},
      // showDevices: false,
      // panels: {
      //   defaults: [{}],
      // },
    };
  }, [template]);

  const onEditor = (editor: Editor) => {
    (window as any).editor = editor;
    //css
    const { Css } = editor;

    Css.setRule("body", {
      margin: `${template.options.margin.top} ${template.options.margin.right} ${template.options.margin.bottom} ${template.options.margin.left}`,
    });

    //add remote-local storage
    const { Storage } = editor;

    Storage.add("remote-local", {
      async store(data, options) {
        const page = editor.Pages.getMain();
        const component = page.getMainComponent();
        try {
          await onUpdate?.(template.id, {
            assets: data.assets,
            components: editor.getComponents(),
            html: editor.getHtml({ component }),
            css: editor.getCss({ component }),
            styles: editor.getStyle(),
          });
        } catch (e) {
          const localStorage = Storage.get("local");
          await localStorage?.store(data, Storage.getStorageOptions("local"));
        }
      },
      async load(options) {
        return template;
      },
    });
    editor.on("run:preview", () => editor.stopCommand("ruler-visibility"));
  };

  return (
    <ThemeProvider theme={theme}>
      <div id="nebo-container">
        <GjsEditor
          className="gjs-custom-editor "
          grapesjs={grapesjs}
          options={options}
          plugins={[
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
            usePlugin(imageEditorPlugin, {
              config: {
                includeUI: {
                  initMenu: "filter",
                },
              },
            }),
            styleBgPlugin,
            borderPlugin,
            usePlugin(rulersPlugin, {
              rulerHeight: 20,
              dragMode: "absolute",
            }),
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
            usePlugin(barcodePlugin, {
              blockBarcode: { category: "Nội dung" },
            }),
            usePlugin(qrcodePlugin, { blockQrcode: { category: "Nội dung" } }),
            usePlugin(gridSystemPlugin, {
              default_css: true,
              default_components: true,
              imgDefault: "",
            }),
            usePlugin(zoomPlugin),
            usePlugin(draggableDocumentPlugin),
            usePlugin(ckePlugin, {
              ckeditor:
                "https://cdn.ckeditor.com/4.14.0/standard-all/ckeditor.js",
              options: ckeConfig,
            }),
          ]}
          onEditor={onEditor}
        >
          <Container fluid className="p-0 nebo-layout-container">
            <div className="nebo-layout-row">
              <div className="p-0 nebo-layout-col">
                <Tabs
                  fill
                  defaultActiveKey="block"
                  className="nebo-pn-left-container rounded-0"
                >
                  <Tab eventKey="block" title="Thêm">
                    <BlocksProvider>
                      {(props) => <BlockManager {...props} />}
                    </BlocksProvider>
                  </Tab>
                  <Tab eventKey="style" title="Thuộc tính">
                    <div
                      id="nebo-style"
                      className="gjs-custom-style-manager text-left"
                    >
                      <TraitsProvider>
                        {(props) => <TraitManager {...props} />}
                      </TraitsProvider>
                      <StylesProvider>
                        {(props) => <StyleManager {...props} />}
                      </StylesProvider>
                    </div>
                  </Tab>
                </Tabs>
              </div>
              <div className="p-0 border border-1 flex-fill">
                <div id="nebo-options">
                  <WithEditor>
                    <Toolbar />
                  </WithEditor>
                </div>
                <Canvas id="nebo-editor" className="gjs-cv-canvas-bg" />
              </div>
              <div className="p-0 nebo-layout-col">
                <Tabs
                  fill
                  defaultActiveKey="layer"
                  className="nebo-pn-right-container"
                >
                  <Tab eventKey="data" title="Dữ liệu">
                    <div id="nebo-data"></div>
                  </Tab>
                  <Tab eventKey="layer" title="Cấu trúc">
                    <LayersProvider>
                      {(props) => <LayerManager {...props} />}
                    </LayersProvider>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </Container>
          {/* <ModalProvider>
            {({ open, title, content, close, ...props }) => (
              <Modal
                open={open}
                title={title}
                content={content}
                close={close}
                attributes={props.attributes}
              />
            )}
          </ModalProvider> */}
          {/* <AssetsProvider>
            {({ assets, select, close, Container }) => (
              <Container>
                <AssetManager assets={assets} select={select} close={close} />
              </Container>
            )}
          </AssetsProvider> */}
        </GjsEditor>
      </div>
    </ThemeProvider>
  );
};

export default WebBuilderContainer;
