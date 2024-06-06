import {
  ComponentDefinition,
  Editor,
  Trait,
  TraitOption,
  TraitProperties,
  Traits,
} from "grapesjs";
import { QrcodePluginOptions } from "./types";
import { formatName } from "../utils";
import { TYPES } from "../constants";

export default (editor: Editor, opts: QrcodePluginOptions) => {
  const { DomComponents } = editor;
  const { keys } = Object;

  const qrcodeProps: ComponentDefinition = {
    dataValue: true,
    varName: "",
    exampleValue: "",
    code: "https://nebo.com/",
    foreground: "#000000",
  };

  const getTraitType = (value: any, name: any) => {
    if (name === "dataValue") return "switch";
    if (typeof value == "number") return "number";
    if (typeof value == "boolean") return "checkbox";
    if (typeof value == "object") return "select";
    if (value.startsWith("#")) return "color";
    return "text";
  };
  const getName = (name: string) => {
    let _name = name;
    switch (name) {
      case "dataValue":
        _name = "Variables";
        break;
    }
    return _name;
  };

  const traits: Partial<TraitProperties>[] = keys(qrcodeProps).map((name) => ({
    changeProp: true,
    type: getTraitType(qrcodeProps[name], name),
    options: qrcodeProps[name] as TraitOption[],
    min: 0,
    placeholder: "placeholder",
    name: getName(name),
  }));

  DomComponents.addType(TYPES.qrcode, {
    extend: "image",
    model: {
      defaults: opts.props({
        ...qrcodeProps,
        qrcodesrc: opts.script,
        droppable: false,
        stylable: [
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
        ],
        traits,

        ...opts.component,
      }),

      init() {
        const events = traits.map((i) => `change:${i.name}`).join(" ");
        this.on(events, this.generateQrcodeImage);
        this.generateQrcodeImage();
        this.afterInit();
      },
      afterInit() {
        const tr = this.get("traits");
        const dataValue = tr?.models?.find((t: Trait) => t.id === "dataValue");

        if (dataValue?.getValue() === "static") {
          traits.push({
            id: "dataValue",
            name: "Variable",
            value: dataValue.getValue(),
            changeProp: true,
            type: "checkbox",
            min: 0,
            placeholder: "placeholder",
          });
        } else {
        }

        // debugger;
        // if (code) {
        //   code.parent = "data-value=static";
        //   code.placeholder = "https://nebo.com/";
        // }
        // !tr.find((t: any) => t.name === "placeholder") &&
        //   tr.unshift({
        //     name: "placeholder",
        //     label: "Example Value",
        //     parent: "data-value=variable",
        //     placeholder: "https://documint.me",
        //     type: "info-text",
        //     info: "This value will be used only in the designer.",
        //     changeProp: true,
        //   });
        // !tr.find((t: any) => t.name === "varName") &&
        //   tr.unshift({
        //     name: "varName",
        //     label: "Variable Name",
        //     type: "error-text",
        //     parent: "data-value=variable",
        //     placeholder: "e.g. var",
        //     changeProp: true,
        //   });
        // !tr.find((t: any) => t.name === "data-value") &&
        //   tr.unshift({
        //     name: "data-value",
        //     type: "switch",
        //     valueTrue: "variable",
        //     valueFalse: "static",
        //     label: "Variable",
        //   });
        // this.set("traits", tr);
      },

      generateQrcodeImage() {
        const params = new URLSearchParams({
          dark: this.get("foreground"),
        });
        const value = this.getAttributes()["data-value"];
        const varName = this.get("varName");
        const code =
          value !== "static" && varName
            ? `{{$encodeURIComp ${formatName(varName)}}}`
            : encodeURIComponent(this.get("code"));
        this.set({
          src: `${opts.api}?code=${code}&${params.toString()}`,
        });
      },
    },
    view: {
      onActive() {},
    },
  });
};
