import {
  ComponentDefinition,
  Editor,
  TraitOption,
  TraitProperties,
} from "grapesjs";
import { BarcodePluginOptions } from "./types";
import Barcode from "jsbarcode";
import { transform } from "typescript";
import { TYPES } from "../constants";

export default (editor: Editor, opts: BarcodePluginOptions) => {
  const { DomComponents } = editor;
  const { keys } = Object;

  const formats = [
    {
      id: "CODE128",
      name: `auto(CODE128)`,
      default: "123456789012",
    },
    {
      id: "CODE39",
      name: "CODE39",
      default: "123456789012",
    },
    {
      id: "EAN13",
      name: "EAN13",
      default: "1234567890128",
    },
    {
      id: "UPC",
      name: "UPC",
      default: "123456789012",
    },
    {
      id: "EAN8",
      name: "EAN8",
      default: "1234567",
    },
    {
      id: "ITF14",
      name: "ITF14",
      default: "1234567890124",
    },
    {
      id: "MSI",
      name: "MSI",
      default: "123456789012",
    },
    {
      id: "pharmacode",
      name: "pharmacode",
      default: "123456",
    },
    {
      id: "codabar",
      name: "codabar",
      default: "123456789012",
    },
  ];

  const rotation: { id: string; name: string }[] = [
    {
      id: "N",
      name: "0deg",
    },
    {
      id: "R",
      name: "90deg",
    },
    {
      id: "B",
      name: "180deg",
    },
    {
      id: "L",
      name: "270deg",
    },
  ];
  const barcodeProps: ComponentDefinition = {
    format: formats,
    variables: false,
    code: "123456789012",
    lineColor: "#000000",
    width: 2,
    height: 100,
    fontSize: 20,
    textMargin: 2,
    textAlign: [
      {
        id: "left",
        name: "left",
      },
      {
        id: "center",
        name: "center",
      },
      {
        id: "right",
        name: "right",
      },
    ],
    textPosition: [
      {
        id: "top",
        name: "top",
      },
      {
        id: "bottom",
        name: "bottom",
      },
    ],
    rotation: rotation,
    displayValue: true,
  };

  const getTraitType = (value: any, name: any) => {
    if (name === "variables") return "switch";
    if (typeof value == "number") return "number";
    if (typeof value == "boolean") return "checkbox";
    if (typeof value == "object") return "select";
    if (value.startsWith("#")) return "color";
    return "text";
  };

  const traits: Partial<TraitProperties>[] = keys(barcodeProps).map((name) => {
    const title = name === "format" ? { info: opts.formatInfo } : {};
    const label =
      name === "width"
        ? { label: "Bar Width(px)" }
        : name === "height"
          ? { label: "Bar Height(px)" }
          : name === "lineColor"
            ? { label: "Line Color" }
            : name === "fontSize"
              ? { label: "Font Size(px)" }
              : name === "textMargin"
                ? { label: "Text Margin(px)" }
                : name === "textAlign"
                  ? { label: "Text Align" }
                  : name === "textPosition"
                    ? { label: "Text Position" }
                    : name === "displayValue"
                      ? { label: "Display Value" }
                      : {};
    return {
      changeProp: true,
      type: getTraitType(barcodeProps[name], name),
      options: barcodeProps[name] as TraitOption[],
      min: 0,
      placeholder: "placeholder",
      name,
      ...title,
      ...label,
    };
  });

  barcodeProps.format = "CODE128";
  barcodeProps.textAlign = "center";
  barcodeProps.textPosition = "bottom";
  barcodeProps.rotation = "N";

  DomComponents.addType(TYPES.barcode, {
    extend: "image",
    model: {
      defaults: opts?.props({
        ...barcodeProps,
        barcodesrc: opts.script,
        droppable: false,
        traits: traits,
        stylable: ["transform"],
        ...opts.component,
      }),

      init() {
        const events = traits.map((i) => `change:${i.name}`).join(" ");
        this.on(events, this.generateBarcodeImage);
        this.on("change:format", () => {
          this.setDefaults();
          this.setDefaultsPlaceholder();
        });
        this.on("change:code", this.validateBarcode);
        this.on("change:placeholder", this.validatePlaceholder);
        this.on("change:code change:width change:height", this.setAspectRatio);
        this.generateBarcodeImage();
        this.setAspectRatio();
        this.afterInit();
      },

      generateBarcodeImage() {
        const params = new URLSearchParams({
          height: this.get("height"),
          width: this.get("width"),
          fontSize: this.get("fontSize"),
          lineColor: this.get("lineColor"),
          displayValue: this.get("displayValue"),
          format: this.get("format"),
          textMargin: this.get("textMargin"),
          textAlign: this.get("textAlign"),
          textPosition: this.get("textPosition"),
          rotation: this.get("rotation"),
        });
        const code = !!this.get("variables")
          ? `{{${this.get("code").replace("{{", "").replace("}}", "")}}}`
          : this.get("code");
        this.set({
          src: `${opts.api}?code=${code}&${params.toString()}`,
          style: `transform: rotate(${rotation.find((a: { id: string; name: string }) => a.id === this.get("rotation"))?.name});`,
          styles: `.gjs-transform-rotate{transform: rotate(${rotation.find((a: { id: string; name: string }) => a.id === this.get("rotation"))?.name});}`,
        });
      },

      validateBarcode() {
        const canvas = document.createElement("canvas");
        try {
          Barcode(canvas, this.get("code"), { format: this.get("format") });
          return true;
        } catch (error) {
          this.setDefaults();
          return false;
        }
      },

      validatePlaceholder() {
        const canvas = document.createElement("canvas");
        try {
          Barcode(canvas, this.get("placeholder"), {
            format: this.get("format"),
          });
          return true;
        } catch (error) {
          this.setDefaultsPlaceholder();
          return false;
        }
      },

      setDefaults() {
        const format = this.get("format");
        const code = formats.find((f) => f.id === format)?.default;
        this.set({ code });
      },

      setDefaultsPlaceholder() {
        const format = this.get("format");
        const placeholder = formats.find((f) => f.id === format)?.default;
        this.set({ placeholder });
      },

      getAscpectRatio() {
        const w = parseFloat(this.get("width")) * this.get("code").length;
        const h = this.get("height");

        if (w > h) return `${w} / ${h}`;
        return `${h} / ${w}`;
      },

      setAspectRatio() {
        this.addStyle({ "aspect-ratio": this.getAscpectRatio() });
      },

      afterInit() {},
    },
    view: {
      onActive(ev) {},
    },
  });
};
