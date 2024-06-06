import { ComponentManager, Trait } from "grapesjs";
import { TYPES } from "../constants";
import { getAndMergeModels } from "../../utils";

export const type = TYPES.checkbox;
export function formatName(name: string) {
  if (!name) return "";

  const match = name.match(/.*\.\.\//);
  let prefix = "";
  let suffix = name;

  if (match) {
    const splitIndex = (match.index || 0) + match[0].length;
    prefix = name.slice(0, splitIndex);
    suffix = name.slice(splitIndex);
  }

  const pathname = suffix
    .split(".")
    .map((n) => n.replace(/^\[|\]$/g, "") ?? n)
    .map((n) => n?.trim?.() ?? n)
    .map((n) => (n === "this" ? "this" : `[${n}]`))
    .join(".");

  return prefix + pathname;
}

export const listenTraits = (model: any) => {
  const traits = model.getTraits();
  const attrs = model.getAttributes();
  const childTraits = traits.filter((trait: any) => trait.get("parent"));
  const selectTraits = traits.filter(
    (trait: any) =>
      trait.get("type") === "select" || trait.get("type") === "switch"
  );

  childTraits.forEach((trait: any) => {
    const parent = trait.get("parent");
    if (parent) {
      const values = parent.split("=");
      if (values[1]) {
        const def = attrs[values[0]];
        const dep = values[1];
        const isBool = typeof def === "boolean";
        const isNum = typeof def === "number";
        const parentValue = isBool
          ? dep === "true"
            ? true
            : false
          : isNum
            ? parseFloat(dep)
            : dep;
        if (def !== parentValue) {
          model.updateTrait(trait.get("name"), {
            attributes: { style: "display: none;" },
          });
        }
      } else if (!attrs[parent]) {
        model.updateTrait(trait.get("name"), {
          attributes: { style: "display: none;" },
        });
      }
    }
  });

  selectTraits.forEach((trait: Trait) => {
    const name = trait.get("name");
    model.on(`change:attributes:${name}`, (ev: any) => {
      const myChildTraits = childTraits.filter(
        (trait: any) => trait.get("parent").split("=")[0] === name
      );
      myChildTraits.forEach((trait: any) => {
        const parent = trait.get("parent").split("=").pop();
        const changed = name ? ev.changed.attributes[name] : undefined;
        const isBool = typeof changed === "boolean";
        const isNum = typeof changed === "number";
        const parentValue = isBool
          ? parent === "true"
            ? true
            : false
          : isNum
            ? parseFloat(parent)
            : parent;
        const display = changed === parentValue ? "block" : "none";
        //@ts-ignore
        trait && (trait.view.el.style.display = display);
      });
    });
  });
};

export const protectedCss = `
  /* CHECKBOX COMPONENT */
  div[data-gjs-type="${type}"]{ 
    display: flex;
    font-family: inherit;
    justify-content: flex-start;
  }

  [data-gjs-type="${type}"] input {
    display: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    color: inherit;
    border: none;
    background-color: rgba(0,0,0,0);
    box-sizing: border-box;
    width: 100%;
    position: relative;
    padding: 5px;
    z-index: 1;
  }
  [data-gjs-type="${type}"] i {
    -ms-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    transform: rotate(45deg);
    box-sizing: border-box;
    display: block;
    height: 14px;
    margin: 0 5px;
    width: 6px;
  }
  [data-gjs-type="${type}"] i:empty {
    color: inherit !important;
  }
  [data-gjs-type="${type}"] [data-type="radio"] i {
    height: 1px;
    width: 1px;
    margin: 3px;
  }
  [data-gjs-type="${type}"] [data-type="xbox"] i {
    display: contents;
  }
  [data-gjs-type="${type}"] [data-type="xbox"] i:before,
  [data-gjs-type="${type}"] [data-type="xbox"] i:after {
    position: absolute;
    left: 7.5px;
    content: ' ';
    height: 17px;
    border-width: 0;
    border-color: inherit;
    border-style: solid;
  }
  [data-gjs-type="${type}"] [data-type="xbox"] i:before {
    -ms-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  [data-gjs-type="${type}"] [data-type="xbox"] i:after {
    -ms-transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
  [data-gjs-type="${type}"] input:checked + i {
    border-color: inherit;
    border-width: 0 2px 2px 0;
    border-style: solid;
  }
  [data-gjs-type="${type}"] [data-type="radio"] input:checked + i {
    border-width: 11px 11px 0 0;
    border-radius: 50%;
  }
  [data-gjs-type="${type}"] [data-type="xbox"] input:checked + i:before,
  [data-gjs-type="${type}"] [data-type="xbox"] input:checked + i:after {
    border-width: 0 2px 0 0;
  }
  [data-gjs-type="${type}"] [data-type] {
    margin: 8px;
    padding: 0;
    width: 17px;
    height: 17px;
    display: block;
    cursor: pointer;
    background-color: rgba(0,0,0,.1);
    border: none;
    box-shadow: none;
    border-radius: 2px;
    box-sizing: border-box;
    position: relative;
  }
  [data-gjs-type="${type}"] [data-type="radio"] {
    border-radius: 50%;
  }
  [data-gjs-type="${type}"] label { 
    font-weight: inherit;
    font-style: inherit;
  }
  [data-gjs-type="${type}"] > div:first-child {
    display: flex;
    width: auto;
    align-items: center;
    justify-content: center;
  }
`;

export default function checkboxType(dc: ComponentManager) {
  const model = getAndMergeModels(dc, [TYPES.template, type]);
  const defaults = model.defaults;

  const draggableBlock = `[data-gjs-type=wrapper], [data-gjs-type=gs-columns], [data-gjs-type=${TYPES.column}], [data-gjs-type=${TYPES.gridItem}], [data-gjs-type=${TYPES.column_2}]`;
  const draggable = `[data-gjs-type=gs-columns]:empty, [data-gjs-type=${TYPES.column}], [data-gjs-type=${TYPES.gridItem}], [data-gjs-type=${TYPES.column_2}]`;

  defaults.icon = '<i class="gjs-badge__icon fa-regular fa-square-check"></i>';
  defaults.attributes = {
    ...defaults?.attributes,
    "data-dm-category": "content",
  };
  defaults.draggable = draggableBlock;
  defaults.traits = [
    {
      name: "data-value",
      type: "switch",
      valueTrue: "variable",
      valueFalse: "static",
      label: "Variable",
    },
    {
      name: "placeholder",
      label: "Variable Name",
      parent: "data-value=variable",
      placeholder: "e.g. var",
      type: "error-text",
      changeProp: true,
    },
    {
      name: "varTrue",
      label: "True Value",
      parent: "data-value=variable",
      placeholder: "true",
      type: "info-text",
      info: "By default the checkbox will be checked if the variable's value is true. You can override this by including a custom value here, Ex. yes",
      changeProp: true,
    },
    {
      name: "checked",
      parent: "data-value=static",
      type: "checkbox",
      changeProp: true,
    },
  ];
  defaults.stylable = [
    "color",
    "padding",
    "checkbox-box-type",
    "checkbox-text-position",
    "checkbox-alignment",
    "font-size",
    "justify-content",
    "invalid-scale",
  ];
  defaults.components = [
    {
      type: TYPES.holder + "-2",
      components: [
        {
          type: TYPES.holder,
          components: [
            {
              type: TYPES.toggle,
            },
            {
              type: TYPES.icon,
            },
          ],
        },
        {
          type: TYPES.label,
        },
      ],
    },
  ];

  model.init = function () {
    listenTraits(this);
    this.on("change:attributes:data-value", this.handleValueChange);
    this.on("change:placeholder", this.handleVariableChange);
    this.on("change:checked", this.handleCheckedChange);

    this.set({ draggable });
  };

  model.handleVariableChange = function () {
    const placeholder = this.get("placeholder");
    const varName = formatName(placeholder);
    this.set({ varName });
    this.getCheckbox().addAttributes({
      checked: false,
      "data-helper": varName ? `{{${varName}}}` : "",
    });
  };

  dc.addType(type, { extend: type, model });
}
