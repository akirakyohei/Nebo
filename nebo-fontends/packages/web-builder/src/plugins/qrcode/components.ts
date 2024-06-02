import {
  ComponentDefinition,
  Editor,
  TraitOption,
  TraitProperties,
} from "grapesjs";
import { cmpId } from "./constants";
import { QrcodePluginOptions } from "./types";

export default (editor: Editor, opts: QrcodePluginOptions) => {
  const { DomComponents } = editor;
  const { keys } = Object;

  const qrcodeProps: ComponentDefinition = {
    code: "https://nebo.com/",
    foreground: "#000000",
  };

  const getTraitType = (value: any) => {
    if (typeof value == "number") return "number";
    if (typeof value == "boolean") return "checkbox";
    if (typeof value == "object") return "select";
    if (value.startsWith("#")) return "color";
    return "text";
  };

  const traits: Partial<TraitProperties>[] = keys(qrcodeProps).map((name) => ({
    changeProp: true,
    type: getTraitType(qrcodeProps[name]),
    options: qrcodeProps[name] as TraitOption[],
    min: 0,
    placeholder: "placeholder",
    name,
  }));

  DomComponents.addType(cmpId, {
    extend: "image",
    model: {
      defaults: opts.props({
        ...qrcodeProps,
        qrcodesrc: opts.script,
        droppable: false,
        stylable: false,
        traits,

        ...opts.component,
      }),

      init() {
        const events = traits.map((i) => `change:${i.name}`).join(" ");
        this.on(events, this.generateQrcodeImage);
        this.generateQrcodeImage();
        this.afterInit();
      },

      afterInit() {},

      generateQrcodeImage() {
        const params = new URLSearchParams({
          dark: this.get("foreground"),
        });
        this.set({
          src: `${opts.api}?code=${encodeURIComponent(this.get("code"))}&${params.toString()}`,
        });
      },
    },
    view: {
      onActive() {},
    },
  });
};
