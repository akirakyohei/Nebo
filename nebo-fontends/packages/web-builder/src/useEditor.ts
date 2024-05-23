// import "./style.scss";
// import { useState, useEffect, useContext } from "react";
// import blockBasicPlugin from "grapesjs-blocks-basic";
// // import blockFlexPlugin from "grapesjs-blocks-flexbox";
// // import typedPlugin from "grapesjs-typed";
// // import customCodePlugin from "grapesjs-custom-code";
// import styleGradientPlugin from "grapesjs-style-gradient";
// import imageEditorPlugin from "grapesjs-tui-image-editor";
// import rulersPlugin from "grapesjs-rulers";
// import ckePlugin from "grapesjs-plugin-ckeditor";
// import styleBgPlugin from "grapesjs-style-bg";
// import borderPlugin from "grapesjs-style-border";
// import iconPlugin from "grapesjs-icons";
// import grapesjs, { Editor, EditorConfig, usePlugin } from "grapesjs";
// import zoomPlugin from "./plugins/zoom";
// import draggableDocumentPlugin from "./plugins/draggable-document";
// import barcodePlugin from "./plugins/barcode/barcode";
// import $ from "jquery";
// import { EditorContext } from "./context/EditorContext";

// export const ckeConfig = {
//   toolbar: [
//     { name: "document", items: ["Source"] },
//     { name: "editing", items: ["SelectAll", "-"] },
//     {
//       name: "forms",
//       items: ["Form", "Checkbox", "Radio", "TextField", "Textarea"],
//     },
//     {
//       name: "basicstyles",
//       items: [
//         "Bold",
//         "Italic",
//         "Underline",
//         "Strike",
//         "Subscript",
//         "Superscript",
//         "-",
//         "CopyFormatting",
//         "RemoveFormat",
//       ],
//     },
//     {
//       name: "paragraph",
//       items: [
//         "NumberedList",
//         "BulletedList",
//         "-",
//         "Outdent",
//         "Indent",
//         "-",
//         "Blockquote",
//         "CreateDiv",
//         "-",
//         "JustifyLeft",
//         "JustifyCenter",
//         "JustifyRight",
//         "JustifyBlock",
//         "-",
//         "BidiLtr",
//         "BidiRtl",
//         "Language",
//       ],
//     },
//     "/",
//     {
//       name: "insert",
//       items: [
//         "Image",
//         "Table",
//         "HorizontalRule",
//         "Smiley",
//         "SpecialChar",
//         "PageBreak",
//       ],
//     },
//     { name: "styles", items: ["Styles", "Format", "Font", "FontSize"] },
//     { name: "colors", items: ["TextColor", "BGColor"] },
//     { name: "tools", items: ["Maximize", "ShowBlocks"] },
//     { name: "about", items: ["About"] },
//   ],
// };

// interface Props {
//   height: string;
//   width: string;
// }

// export const useEditor = ({ height, width }: Props) => {
//   const [editors, setEditor] = useState<Editor | null>(null);
//   const { editor: editorContext, setEditor: setEditorContext } =
//     useContext(EditorContext);

//   // useEffect(() => {
//   //   setInterval(() => {
//   //     console.log(editor);
//   //   }, 1000);
//   // }, [editor]);

//   useEffect(() => {
//     if (editorContext == null) {
//       var editor = grapesjs.init({
//         container: "#nebo-editor",
//         blockManager: {
//           appendTo: "#nebo-block",
//         },
//         styleManager: {
//           appendTo: "#nebo-style",
//         },
//         layerManager: {
//           appendTo: "#nebo-layer",
//         },
//         traitManager: {
//           appendTo: "#nebo-trait",
//         },
//         selectorManager: {
//           appendTo: "#nebo-selector",
//         },
//         storageManager: {
//           type: "local",
//         },
//         fromElement: true,
//         deviceManager: {
//           devices: [
//             {
//               name: "custom",
//               width: width,
//               height: height,
//             },
//           ],
//         },
//         height: "100%",
//         pageManager: {},
//         showDevices: false,
//         panels: {
//           defaults: [{}],
//         },
//         plugins: [
//           usePlugin(blockBasicPlugin, {
//             category: "Nội dung",
//             blocks: ["text", "image"],
//             flexGrid: true,
//           }),
//           usePlugin(blockBasicPlugin, {
//             category: "Bố cục",
//             blocks: ["column1", "column2", "column3"],
//             flexGrid: true,
//           }),
//           styleGradientPlugin,
//           usePlugin(imageEditorPlugin, {
//             config: {
//               includeUI: {
//                 initMenu: "filter",
//               },
//             },
//           }),
//           styleBgPlugin,
//           borderPlugin,
//           usePlugin(rulersPlugin, { rulerHeight: 20, dragMode: "absolute" }),
//           usePlugin(iconPlugin, {
//             block: {
//               category: "Nội dung",
//             },
//             collections: [
//               "ri", // Remix Icon by Remix Design,
//               "mdi", // Material Design Icons by Pictogrammers
//               "uim", // Unicons Monochrome by Iconscout
//               "streamline-emojis", // Streamline Emojis by Streamline
//             ],
//           }),
//           usePlugin(barcodePlugin, { blockBarcode: { category: "Nội dung" } }),
//           usePlugin(zoomPlugin),
//           usePlugin(draggableDocumentPlugin),
//           usePlugin(ckePlugin, {
//             ckeditor:
//               "https://cdn.ckeditor.com/4.14.0/standard-all/ckeditor.js",
//             options: ckeConfig,
//           }),
//         ],
//       });

//       // $(".panel__devices").html("");
//       // $(".panel__basic-actions").html("");
//       // $(".panel__editor").html("");
//       // $("#nebo-block").html("");
//       // $("#nebo-style").html("");
//       // $("#nebo-layer").html("");
//       // $("#nebo-trait").html("");
//       // $("#nebo-selector").html("");

//       // Add gradient picker as a single input
//       editor.StyleManager.addProperty("decorations", {
//         type: "gradient", // <- new type
//         name: "Gradient",
//         property: "background-image",
//         defaults: "none",
//         full: true,
//       });

//       // Add the new background-image bulti-in type
//       editor.StyleManager.addProperty("decorations", {
//         extend: "background-image", // <- extend the built-in type
//         name: "Gradient Background",
//       });
//       editor.on("run:preview", () => editor.stopCommand("ruler-visibility"));

//       editor.onReady(() => {
//         editor.render();
//       });
//       console.log("fkdjunf", editor);
//       setEditorContext(editor);
//     }
//   }, []);

//   useEffect(() => {
//     console.log(editors);
//     debugger;
//     if (editors) setEditorContext(editors);
//   }, [editors]);

//   return editors;
// };
