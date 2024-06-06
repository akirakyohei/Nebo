import { TYPES } from "./constants";
import { deepClone, replaceWith } from "../utils";
// import { initValues } from "../../config/styleManager/sectors/linked";
import { Editor } from "grapesjs";

export default function postProcessing(editor: Editor) {
  const selectImage = (component: any) => {
    const img = component.getEl().querySelector("img");
    if (img) {
      editor.select(img);
      const sel = editor.getSelected();
      sel && (sel.view as any).onActive();
    } else editor.select(component);
  };

  editor.on("block:drag:start component:drag:start", (comp, block) => {});

  editor.on("block:drag:stop component:drag:end", (comp, block) => {
    let component = comp?.target ? comp.target : comp;
    component = component && component[0] ? component[0] : component;
    let style = {};
    let postComp;

    const cloneComponent = (component: any) => {
      const clonedComponent = deepClone(component);
      style = component.getStyle();
      clonedComponent.style = style;
      delete clonedComponent.attributes.id;
      return clonedComponent;
    };
    if (component?.get("type") === TYPES.token) {
      component.setContext();
      if (component?.parent().get("type") !== TYPES.text) {
        postComp = {
          type: TYPES.text,
          components: block?.getContent
            ? block.getContent()
            : [cloneComponent(component)],
        };
      }
    }
    if (
      component?.parent()?.get("type") === "gs-columns" &&
      component?.get("type") !== TYPES.column_2
    ) {
      postComp = {
        type: TYPES.column_2,
        components: postComp
          ? [postComp]
          : block?.getContent
            ? block.getContent()
            : [cloneComponent(component)],
      };
    }
    if (
      component?.parent()?.get("type") === "wrapper" &&
      component?.get("type") !== TYPES.section &&
      component?.get("type") !== TYPES.row_2 &&
      component?.get("type") !== TYPES.verticalSpacer &&
      component?.get("type") !== TYPES.pageBreak
    ) {
      postComp =
        component.get("type") === TYPES.column_2
          ? {
              type: TYPES.row_2,
              components: [
                {
                  type: "gs-columns",
                  components: block?.getContent
                    ? block.getContent()
                    : [cloneComponent(component)],
                },
              ],
            }
          : {
              type: TYPES.row_2,
              components: [
                {
                  type: "gs-columns",
                  components: [
                    {
                      type: TYPES.column_2,
                      components: postComp
                        ? [postComp]
                        : block?.getContent
                          ? block.getContent()
                          : [cloneComponent(component)],
                    },
                  ],
                },
              ],
            };
    }
    if (postComp) {
      editor.Modal.close();
      const added = component.replaceWith(postComp);
      block && selectImage(added);
    }
  });

  editor.on("component:mount", (component) => {
    if (component && component.getAttributes()["data-gs-type"] === "column") {
      const columns = component.get("tempColumns");
      columns && component?.setColumns?.(columns);
      component.set({ tempColumns: "" });
    }

    if (
      component &&
      [TYPES.text, "dm-text", "default"].includes(component.get("type")) &&
      component.parent()?.get("type").includes("column")
    ) {
      const el = component.view?.el;
      if (
        el &&
        (el.querySelector("div[data-gjs-type=text]") ||
          el.querySelector("[data-gjs-type=default]"))
      ) {
        const nestedTextEls = el.querySelectorAll("div[data-gjs-type=text]");
        const nestedDefaultEls = el.querySelectorAll(
          "div[data-gjs-type=default]:empty"
        );

        for (let i = 0; i < nestedTextEls.length; i++) {
          replaceWith(nestedTextEls[i], nestedTextEls[i].innerHTML + "<br>");
        }
        for (let i = 0; i < nestedDefaultEls.length; i++) {
          replaceWith(nestedDefaultEls[i], "<br>");
        }
        const nestedDefaultPEls = el.querySelectorAll("p");
        for (let i = 0; i < nestedDefaultPEls.length; i++) {
          nestedDefaultPEls[i].setAttribute("data-gjs-type", TYPES.text);
        }
        component.components(el.innerHTML);
      }
      component.set({
        selectable: true,
        hoverable: true,
      });
    } else if (
      component &&
      [TYPES.text, "dm-text", "default"].includes(component.get("type")) &&
      !component.parent()?.get("type").includes("column")
    ) {
      component.set({
        selectable: false,
        hoverable: false,
      });
    }
  });

  editor.on("component:select", (component) => {
    if (component && component.get("type") === "wrapper")
      editor.Selectors.setComponentFirst(false);
    else editor.Selectors.setComponentFirst(true);

    if (component && component.get("type") === TYPES.row_2)
      component.initRowHeight();

    if (component) {
      const map: Record<string, any> = {
        "--border-radius-all": [
          "border-top-left-radius",
          "border-top-right-radius",
          "border-bottom-left-radius",
          "border-bottom-right-radius",
        ],
        "--padding-all": [
          "padding-top",
          "padding-right",
          "padding-bottom",
          "padding-left",
        ],
      };
      Object.keys(map).forEach((key) => initValues(editor, key, map[key]));
    }
  });
}

export function initValues(editor: Editor, customName: string, keys: any) {
  const target = editor.getSelected();
  const el = target?.getEl();
  if (!el?.style) return;

  // Set to custom or all
  const sm = editor.Styles;
  const prop = keys[0].includes("padding")
    ? sm.getProperty("size_&_spacing", "padding")
    : sm.getProperty("borders_&_corners", "border-radius");
  const col = (prop as any).getProperties()[0].collection;
  const computedStyle = getComputedStyle(el);
  const targetStyle = target?.getStyle();
  const type = `--${customName.split("-")[2]}-type`;
  const value = targetStyle?.[type];
  const customValue = targetStyle?.[type];

  const values: any = [];
  const values2: any = [];
  keys.forEach((element: any) => {
    values2.push(`${col.get(element)?.getValue()}`);
    values.push(computedStyle[element]);
  });
  const toCheck = values2.includes("0") ? values : values2;
  const allEq = allEqual(toCheck);

  const custom = "custom";
  if (customValue !== custom && !allEq) {
    target?.addStyle({ [type]: custom });
  }

  if (!value && allEq)
    target?.addStyle({
      [customName]: isZero(target, values2, toCheck) ? "0px" : toCheck[0],
    });
}

export const allEqual = (arr: any) => arr.every((val: any) => val === arr[0]);

export const isZero = (target: any, values: any, toCheck: any) => {
  const isCol = target.get("type") === TYPES.column_2;
  const notValues = values.includes("0");
  return isCol && notValues && toCheck[0] === "15px";
};
