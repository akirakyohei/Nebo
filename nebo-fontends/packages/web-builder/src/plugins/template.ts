import { getAttrString, formatName } from "./utils";
// import { TYPES } from "./constants";
// import toolbarItems from "../config/toolbarIterms";
// import { formatName } from "./content/checkbox";

import isNil from "lodash/isNil";
import {
  AddComponentTypeOptions,
  ComponentDefinition,
  ComponentManager,
  ComponentModelDefinition,
} from "grapesjs";
import { TYPES } from "./constants";

function isBlank(value: string) {
  return isNil(value) || value === "";
}

function isJsonString(string: string) {
  try {
    JSON.parse(string);
  } catch (e) {
    return false;
  }
  return true;
}

export const type = TYPES.template;

const setContexts = (components: any) => {
  components.each((component: any) => {
    // if (component && component.get("type") === TYPES.token) {
    //   component.setContext();
    // } else {
    setContexts(component.components());
    // }
  });
};

export default function templateType(dc: ComponentManager, options: any) {
  dc.addType(type, {
    extend: "default",
    model: {
      defaults: {
        traits: [],
        loop: "",
        condition: "",
        sorts: null,
        hasLogic: true,
        // toolbar: toolbarItems.all,
      },
      init() {
        const attrs = this.getAttributes();

        // const condition = this.get('condition')
        // attrs['data-condition'] = !isBlank(condition?.operand1)

        const loop = this.getLoop();
        attrs["data-loop"] = !isBlank(loop);
        this.setAttributes(attrs);
      },
      getCondition() {
        return this.get("condition");
      },
      /**
       * Sets the condition property
       * @param { Object } condition
       * @param { string } condition.operand1
       * @param { string } condition.operator
       * @param { string } condition.operand2
       */
      setCondition(condition: any) {
        const type = typeof condition;
        const NAME = "condition";
        let value = condition;

        // Set to default value if no condition
        if (type === "object" && isBlank(condition.operator)) {
          value = { operand1: "", operator: null, operand2: "" };
        }

        this.set(NAME, value);
      },
      hasCondition() {
        const condition = this.get("condition");
        return typeof condition === "object"
          ? !isBlank(condition?.operator)
          : !isBlank(condition);
      },
      getLoop() {
        const loop = this.get("loop");
        if (isBlank(loop)) return;
        return loop;
      },
      setLoop(value: any) {
        const attrName = "loop";
        if (isBlank(value)) {
          const attrs = this.getAttributes();
          delete attrs[attrName];
          this.setAttributes(attrs);
        } else {
          // this.addAttributes({ [attrName]: value })
        }
        this.set("loop", value);
        setContexts(this.components());
      },
      getSorts() {
        const sorts = this.get("sorts");
        if (isBlank(sorts)) return null;
        return sorts;
      },
      setSorts(value: any) {
        const attrName = "sorts";

        if (isBlank(value) || value.length <= 0) {
          const attrs = this.getAttributes();
          delete attrs[attrName];
          this.setAttributes(attrs);
          this.set("sorts", null);
          return;
        }

        // this.addAttributes({ [attrName]: value.join(',') })
        this.set("sorts", value);
      },
      toHTML(opts = {}) {
        const model = this;
        const { type } = model.attributes;

        // HTML TAG
        const customTag = opts.tag;
        delete opts.tag;
        const tag = customTag || model.get("tagName");
        const selfClosingTag = model.get("void");

        // ATTRIBUTES
        const attributes = this.getAttrToHTML();
        attributes["data-gjs-type"] = type;

        const attributeStr = getAttrString(attributes);

        // INNER HTML
        let innerHTML = model.getInnerHTML();

        // ADD HANDLEBARS
        // ///////////////////

        // LOOP
        const loop = model.getLoop();

        let loopQuery = "";
        let loopIf = "";
        const options = [];
        const sorts = model.getSorts();
        if (!isBlank(sorts)) options.push(`sort="${sorts}"`);
        if (!isBlank(loop) && !isJsonString(loop)) {
          loopQuery = formatName(loop);
        } else if (!isBlank(loop) && isJsonString(loop)) {
          const tree = JSON.parse(loop);
          const loopValue = tree ? Object.keys(tree)[0] : null;
          if (loopValue && tree[loopValue]["custom-condition"]) {
            loopQuery = loopValue;
            loopIf = tree[loopValue]["custom-condition"];
          } else if (loopValue && tree[loopValue].logic) {
            loopQuery = `($filter ${loopValue} '${JSON.stringify(tree[loopValue].logic)}')`;
          } else if (loopValue) {
            loopQuery = loopValue;
          }
        }

        loopQuery = loopQuery ? `${loopQuery}  ${options.join(" ")}` : "";

        // HTML
        let HTML = "";
        if (type === TYPES.row || model.get("innerLoop")) {
          HTML = `<${tag} ${attributeStr} ${selfClosingTag && "/"}>
          ${loopQuery ? `{{#each ${loopQuery}}}` : ""}
            ${loopIf ? `{{#if (${loopIf}) }}` : ""}
              ${innerHTML}
            ${loopIf ? `{{/if}}` : ""}
          ${loopQuery ? `{{/each}}` : ""}
        ${selfClosingTag ? "" : `</${tag}>`}`;
        } else {
          HTML = `${loopQuery ? `{{#each ${loopQuery}}}` : ""}
          ${loopIf ? `{{#if (${loopIf}) }}` : ""}
            <${tag} ${attributeStr} ${selfClosingTag && "/"}>
              ${innerHTML}
            ${selfClosingTag ? "" : `</${tag}>`}
          ${loopIf ? `{{/if}}` : ""}
        ${loopQuery ? `{{/each}}` : ""}`;
        }

        // CONDITION
        const condition = model.getCondition() || {};
        if (typeof condition === "object" && !isBlank(condition.operator)) {
          const { operand1, operand2, operator } = condition;
          HTML = `{{#compare ${formatName(operand1)} "${operator}" ${operand2} }} ${HTML} {{/compare}} `;
        } else if (!isBlank(condition) && isJsonString(condition)) {
          const tree = JSON.parse(condition);
          if (tree["custom-condition"])
            HTML = `{{#if (${tree["custom-condition"]}) }} ${HTML} {{/if}} `;
          else if (tree.logic)
            HTML = `{{#compare '${JSON.stringify(tree.logic)}' }} ${HTML} {{/compare}} `;
        }

        return HTML.replace(new RegExp("&quot;", "g"), '"')
          .replace(new RegExp("&#039;", "g"), "'")
          .replace(new RegExp(`<font(.*?)>`, "g"), "")
          .replace(new RegExp("</font>", "g"), "");
      },
    },
    isComponent(el: HTMLElement) {
      return true;
    },
  });
  return dc;
}
