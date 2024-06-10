// import "./blocks";
// import "./commands";
// import "./styleTypes";
// import "./componentTypes";
// import "./traitTypes";

import "grapesjs-blocks-basic";
import "grapick/dist/grapick.min.css";
import "grapesjs/dist/css/grapes.min.css";

import gridSystem from "../grid-system";
// import propertyToggle from '@documint/grapesjs-property-toggle'
// import checkbox from '@documint/grapesjs-component-checkbox'
import barcode from "../barcode";
import qrcode from "../qrcode";
import { MAX_GRID } from "./componentTypes/constants";
import { Editor } from "grapesjs";
import commands from "./commands";
import componentTypes, {
  protectedCss as componentProtectedCss,
} from "./componentTypes";
import blockEs from "./blocks";

const blocks = [
  (e: Editor) => gridSystem(e, { maxGrid: MAX_GRID }),
  //   propertyToggle,
  //   (e:Editor) => checkbox(e, { blocks: null }),
  (e: Editor) =>
    barcode(e, {
      api: "https://documint-code-generator-elkqclkaca-uk.a.run.app/api/v1/barcodes",
    }),
  (e: Editor) =>
    qrcode(e, {
      api: "https://documint-code-generator-elkqclkaca-uk.a.run.app/api/v1/qrcodes",
    }),
  (e: Editor) => componentTypes(e),
  //   "dm-style-types",
  //   "dm-trait-types",
  (e: Editor) => blockEs(e),
  (e: Editor) => commands(e),
];

export default function (editor: Editor) {
  blocks.forEach((b) => b(editor));
  return editor;
}

export const protectedCss = componentProtectedCss;

export const options = {};
