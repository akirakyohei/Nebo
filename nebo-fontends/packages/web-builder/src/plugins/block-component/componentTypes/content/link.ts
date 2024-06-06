import { TYPES } from "../constants";
import { listenTraits, formatName } from "./checkbox";
import { move, parent, clone, remove } from "../../config/toolbarIterms";
import { ComponentManager } from "grapesjs";

export const type = TYPES.link;

export const protectedCss = `
  /* BUTTON COMPONENT */
  *[data-gjs-type="${type}"]{
    text-decoration: none;
  }
`;

export default function linkType(dc: ComponentManager) {
  dc.addType(type, {
    model: {
      defaults: {
        name: "Link",
        icon: '<i class="fa fa-link"></i>',
        toolbar: [move, parent, clone, remove],
        traits: [
          {
            name: "data-value",
            type: "switch",
            valueTrue: "variable",
            valueFalse: "static",
            label: "Variable",
          },
          {
            label: "URL",
            name: "href",
            parent: "data-value=static",
            placeholder: "https://nebo.com",
          },
          {
            name: "varName",
            label: "Variable Name",
            parent: "data-value=variable",
            placeholder: "e.g. var",
            type: "error-text",
            changeProp: true,
          },
        ] as any,
        attributes: {
          "data-value": "static",
        },
        stylable: [
          "background-color",
          "background-image",
          "background-size",
          "background-position",
          "background-repeat",
          "color",
          "text-align",
          "font-size",
          "font-family",
          "font-style",
          "text-decoration",
          "font-weight",
          "line-height",
          "word-break",
          "word-wrap",
          "text-transform",
          "letter-spacing",
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
      },
      init() {
        listenTraits(this);
        this.on("change:attributes:data-value", this.handleValueChange);
        this.on("change:varName", this.handleVariableChange);
        this.afterInit();
      },
      handleValueChange() {
        const value = this.getAttributes()["data-value"];
        if (value !== "static") this.handleVariableChange();
        else
          this.getAttributes()["href"]?.startsWith("{") &&
            this.addAttributes({ href: "" });
      },
      handleVariableChange() {
        const varName = this.get("varName");
        varName && this.addAttributes({ href: `{{${formatName(varName)}}}` });
      },
      afterInit() {},
    },
  });
}
