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
import grapesjs, { EditorConfig, usePlugin } from "grapesjs";
import zoomPlugin from "./plugins/zoom";
import draggableDocumentPlugin from "./plugins/draggable-document";
import barcodePlugin from "./plugins/barcode/barcode";

export const ckeConfig = {
  toolbarGroups: [
    { name: "document", items: ["Source"] },
    { name: "editing", items: ["SelectAll", "-", "Scayt"] },
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

export const WebEditor = ({ ...props }: EditorConfig | undefined) => {
  var editor = grapesjs.init({
    container: "#gjs",
    pageManager: {},
    showDevices: false,
    storageManager: {
      type: "indexeddb",
    },
    panels: {
      defaults: [{}],
    },
    ...props,
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
      // presetWebpagePlugin,
      // blockFlexPlugin,
      // typedPlugin,
      // customCodePlugin,
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
      rulersPlugin,
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
      usePlugin(ckePlugin, { options: ckeConfig }),
      ...(props?.plugins || []),
    ],
  });

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
  return editor;
};
