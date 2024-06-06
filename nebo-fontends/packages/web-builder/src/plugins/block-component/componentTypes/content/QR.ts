import { TYPES } from "../constants";
import { getAndMergeModels } from "../../utils";
import { formatName, listenTraits } from "./checkbox";
import { ComponentManager } from "grapesjs";

export const type = TYPES.qrcode;

export const protectedCss = `
  /* QR CODE COMPONENT */
  *[data-gjs-type="${type}"] {
    aspect-ratio: 1/1;
    object-fit: contain;
  }
`;

export default function qrType(dc: ComponentManager, opts: any) {
  const model = getAndMergeModels(dc, [TYPES.template, type, "qr-code"]);
  const defaults = model.defaults;

  const draggableBlock = `[data-gjs-type=wrapper], [data-gjs-type=gs-columns], [data-gjs-type=${TYPES.column}], [data-gjs-type=${TYPES.gridItem}], [data-gjs-type=${TYPES.column_2}]`;
  const draggable = `[data-gjs-type=gs-columns]:empty, [data-gjs-type=${TYPES.column}], [data-gjs-type=${TYPES.gridItem}], [data-gjs-type=${TYPES.column_2}]`;

  defaults.name = "QR Code";
  defaults.icon = '<i class="gjs-badge__icon fa-regular fa-qrcode"></i>';
  defaults.attributes = {
    ...defaults?.attributes,
    "data-dm-category": "content",
    "data-value": "static",
  };
  defaults.draggable = draggableBlock;
  defaults.stylable = [
    "align-self",
    "margin",
    "background-color",
    "border-width",
    "border-color",
    "border-style",
    "padding",
    "padding-top",
    "padding-right",
    "padding-bottom",
    "padding-left",
    "better-borders",

    "border-radius",
    "border-top-left-radius",
    "border-top-right-radius",
    "border-bottom-right-radius",
    "border-bottom-left-radius",
  ];

  model.initTraits = function () {
    const tr = this.get("traits");
    const code = tr.find((t: any) => t.name === "code");
    if (code) {
      code.parent = "data-value=static";
      code.placeholder = "https://documint.me";
    }
    !tr.find((t: any) => t.name === "placeholder") &&
      tr.unshift({
        name: "placeholder",
        label: "Example Value",
        parent: "data-value=variable",
        placeholder: "https://documint.me",
        type: "info-text",
        info: "This value will be used only in the designer.",
        changeProp: true,
      });
    !tr.find((t: any) => t.name === "varName") &&
      tr.unshift({
        name: "varName",
        label: "Variable Name",
        type: "error-text",
        parent: "data-value=variable",
        placeholder: "e.g. var",
        changeProp: true,
      });
    !tr.find((t: any) => t.name === "data-value") &&
      tr.unshift({
        name: "data-value",
        type: "switch",
        valueTrue: "variable",
        valueFalse: "static",
        label: "Variable",
      });
    this.set("traits", tr);
  };

  model.afterInit = function () {
    listenTraits(this);
    this.on(
      "change:attributes:data-value change:varName change:placeholder",
      this.generateQrcodeImage
    );
    this.set({ draggable });
  };

  model.generateQrcodeImage = function () {
    const params = new URLSearchParams({
      dark: this.get("foreground"),
      placeholder: this.get("placeholder") || "https://documint.me",
    });
    const value = this.getAttributes()["data-value"];
    const varName = this.get("varName");
    const code =
      value !== "static" && varName
        ? `{{$encodeURIComp ${formatName(varName)}}}`
        : encodeURIComponent(this.get("code"));
    this.set({
      src: `${opts.api}/qrcodes?code=${code}&${params.toString()}`,
    });
  };

  dc.addType(type, { extend: "qr-code", model });
}
