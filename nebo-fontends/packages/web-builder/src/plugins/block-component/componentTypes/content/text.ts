import { TYPES } from "../constants";
import { getAndMergeModels } from "../../utils";
import { move, parent, clone, remove } from "../../config/toolbarIterms";
import { ComponentManager, Editor } from "grapesjs";

export const type = TYPES.text;

export const protectedCss = `
  /* TEXT COMPONENT */
  div[data-gjs-type="${type}"],
  div[data-gjs-type="dm-text"] {
    width: 100%;
    height: auto;
    color: inherit;
    text-transform: inherit;
    word-break: normal;
    box-sizing: border-box;
    overflow-wrap: inherit;
    position: relative;
    display: block;
  }
`;

export default function textType(
  dc: ComponentManager,
  { editor: { $ } }: { editor: Editor }
) {
  const model = getAndMergeModels(dc, [TYPES.template]);
  const defaults = model.defaults;
  const droppable = `[data-gjs-type=${TYPES.token}]`;
  const draggableBlock = `[data-gjs-type=wrapper], [data-gjs-type=gs-columns], [data-gjs-type=${TYPES.column}], [data-gjs-type=${TYPES.gridItem}], [data-gjs-type=${TYPES.column_2}]`;
  const draggable = `[data-gjs-type=gs-columns]:empty, [data-gjs-type=${TYPES.column}], [data-gjs-type=${TYPES.gridItem}], [data-gjs-type=${TYPES.column_2}]`;

  defaults.name = "Text";
  defaults.icon = '<i class="gjs-badge__icon dm-icon dm-text"></i>';
  defaults.attributes = {
    ...defaults?.attributes,
    "data-dm-category": "content",
  };
  // defaults.traits = [...defaults?.traits, { name: 'label' }]
  defaults.traits = [];
  defaults.editable = true;
  defaults.droppable = droppable;
  defaults.draggable = draggableBlock;
  defaults.stylable = [
    "background-color",
    "background-image",
    "background-size",
    "background-position",
    "background-repeat",
    "page-break-inside",
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
  ];

  const isComponent = function (el: HTMLElement) {
    return true;
  };

  model.init = function () {
    // const tag = this.get('tagName')
    // const excludeTags = ['b', 'i', 'u', 'strike', 'span', 'p', 'strong', 'em']
    this.get("type") !== "text" && this.set({ type });
    this.parent()?.get("type").includes("column") &&
      this.addClass("pt-10 pr-10 pb-10 pl-10");
    this.set({ draggable });
  };

  dc.addType(type, { model });
  dc.addType("dm-text", { model, extend: type, isComponent });
  dc.addType("box", {
    extend: "default",
    model: {
      defaults: {
        name: "Box",
        toolbar: [move, parent, clone, remove],
        icon: '<i class="gjs-badge__icon fa-light fa-cube"></i>',
      },
    },
  });
  dc.addType("default", { model, extend: type, isComponent });
}
