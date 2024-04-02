import "./style.css";
import blockBasicPlugin from "grapesjs-blocks-basic";
import zoomPlugin from "grapesjs-zoom-plugin";
import blockFlexPlugin from "grapesjs-blocks-flexbox";
import typedPlugin from "grapesjs-typed";
import customCodePlugin from "grapesjs-custom-code";
import styleGradientPlugin from "grapesjs-style-gradient";
import imageEditorPlugin from "grapesjs-tui-image-editor";
import rulersPlugin from "grapesjs-rulers";
import templateManagerPlugin from "grapesjs-template-manager";
import ckePlugin from "grapesjs-plugin-ckeditor";
import styleBgPlugin from "grapesjs-style-bg";
import borderPlugin from "grapesjs-style-border";
import iconPlugin from "grapesjs-icons";
import grapesjs, {
  Editor as EditorEx,
  EditorConfig,
  usePlugin,
} from "grapesjs";

export type WebEditorConfig = EditorConfig & {
  title: string;
};

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

export const WebEditor = ({ ...props }: WebEditorConfig | undefined) => {
  var editor = grapesjs.init({
    container: "#gjs",
    pageManager: {},
    showDevices: false,
    storageManager: {
      type: "indexeddb",
    },
    ...props,
    plugins: [
      usePlugin(blockBasicPlugin, {
        blocks: ["column1", "column2", "column3", "text", "image"],
        flexGrid: true,
      }),
      // presetWebpagePlugin,
      blockFlexPlugin,
      typedPlugin,
      customCodePlugin,
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
      // templateManagerPlugin,
      usePlugin(iconPlugin, {
        collections: [
          "ri", // Remix Icon by Remix Design,
          "mdi", // Material Design Icons by Pictogrammers
          "uim", // Unicons Monochrome by Iconscout
          "streamline-emojis", // Streamline Emojis by Streamline
        ],
      }),
      usePlugin(ckePlugin, { options: ckeConfig }),
      (_editor: any) => zoomPlugin(_editor),
      ...(props?.plugins || []),
    ],
  });

  editor.Panels.removePanel("devices-c");

  editor.BlockManager.add("my-first-block", {
    label: "Simple block",
    content: `<div class="my-block margin-only"
              style="box-sizing: border-box; height: 100px; margin: 10vh 0 0 0; text-align: center;">
              This is a simple block 2</div>`,
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

  const pn = editor.Panels;
  const panelViews = pn.addPanel({
    id: "options",
  });
  panelViews?.get("buttons")?.add([
    {
      attributes: {
        title: "Toggle Rulers",
      },
      context: "toggle-rulers", //prevents rulers from being toggled when another views-panel button is clicked
      label: `<svg width="18" viewBox="0 0 16 16"><path d="M0 8a.5.5 0 0 1 .5-.5h15a.5.5 0 0 1 0 1H.5A.5.5 0 0 1 0 8z"/><path d="M4 3h8a1 1 0 0 1 1 1v2.5h1V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2.5h1V4a1 1 0 0 1 1-1zM3 9.5H2V12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9.5h-1V12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/></svg>`,
      command: "ruler-visibility",
      id: "ruler-visibility",
    },
  ]);
  editor.on("run:preview", () => editor.stopCommand("ruler-visibility"));

  pn.addButton("options", {
    id: "open-templates",
    className: "fa fa-folder-o",
    attributes: {
      title: "Open projects and templates",
    },
    command: "open-templates", //Open modal
  });
  pn.addButton("views", {
    id: "open-pages",
    className: "fa fa-file-o",
    attributes: {
      title: "Take Screenshot",
    },
    command: "open-pages",
    togglable: false,
  });
  return editor;
};

export type Editor = EditorEx;
export * from "grapesjs";
export default WebEditor;
