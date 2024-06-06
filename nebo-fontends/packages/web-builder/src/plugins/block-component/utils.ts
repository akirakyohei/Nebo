import isBoolean from "lodash/isBoolean";
import merge from "lodash/merge";
import pickBy from "lodash/pickBy";
import identity from "lodash/identity";
import { ComponentManager, Editor } from "grapesjs";

export function getAttrString(obj: Object) {
  try {
    return Object.entries(obj)
      .filter(([key, value]) => value !== undefined)
      .map(([key, value]) => (isBoolean(value) ? key : `${key}="${value}"`))
      .join(" ");
  } catch (error) {
    return "";
  }
}

export function filterObject(obj: Object, clb: any) {
  try {
    return Object.fromEntries(
      Object.entries(obj).filter(([key, value]) => clb(key, value))
    );
  } catch (error) {
    return {};
  }
}

/**
 * Gets defaults and merges them
 * @param {*} domComponents
 * @param {String[]} componentNames
 */
export function getAndMergeModels(
  domComponents: ComponentManager,
  componentNames: any = []
) {
  if (!domComponents || componentNames.length === 0) return {};

  const allModels = componentNames.map((name: any) => {
    try {
      const model = domComponents.getType(name).model;
      const defaults = model?.getDefaults() || {};
      const proto = model?.prototype || {};
      return { ...model, ...proto, defaults: pickBy(defaults, identity) };
    } catch (error) {
      return {};
    }
  });

  return merge({}, ...allModels);
}

export const elHasClass = (el: HTMLElement, toFind: string) => {
  let cls = el.className;
  cls = cls && cls.toString();
  if (cls && cls.split(" ").indexOf(toFind) >= 0) return 1;
};

/**
 *
 * @param {*} editor
 * @param {String[]} selectors Array of css selectors to make private
 */
export const setPrivateSelectors = (
  editor: Editor,
  privateSelectors: any = []
) => {
  try {
    editor.on(
      "selector:add",
      (selector) =>
        privateSelectors.indexOf((selector as any).getFullName()) >= 0 &&
        selector.set("private", 1)
    );
  } catch (error) {
    console.log("set private selectors error", error);
  }
};

/**
 *
 * @param {Object} obj
 */
export const deepClone = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Replace element with text
 * @param {HTMLElement} el Element to replace
 * @param {Strinq} text String to replace it with
 */
export const replaceWith = (el: HTMLElement, text: string) => {
  if (el.outerHTML) {
    //if outerHTML is supported
    el.outerHTML = text; ///it's simple replacement of whole element with contents of str var
  } else {
    //if outerHTML is not supported, there is a weird but crossbrowsered trick
    const tmpObj = document.createElement("div");
    tmpObj.innerHTML = "<!--THIS DATA SHOULD BE REPLACED-->";
    const ObjParent = el.parentNode; //Okey, element should be parented
    ObjParent?.replaceChild(tmpObj, el); //here we placing our temporary data instead of our target, so we can find it then and replace it into whatever we want to replace to
    (ObjParent as any).innerHTML = (ObjParent as any).innerHTML.replace(
      "<div><!--THIS DATA SHOULD BE REPLACED--></div>",
      text
    );
  }
};

const utils = {
  isBoolean,
  getAttrString,
  filterObject,
  getAndMergeModels,
  elHasClass,
  setPrivateSelectors,
  deepClone,
  replaceWith,
};

export default utils;
