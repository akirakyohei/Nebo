import { resizerNone } from "../sharedConfig";
import { TYPES } from "../constants";
import { ComponentManager } from "grapesjs";

export const type = TYPES.verticalSpacer;

export const protectedCss = `
  /* VERTICAL SPACER COMPONENT */
  *[data-gjs-type="${type}"]{
    display: flex;
    width: 100%;
    height: 75px;
  }
`;

export default function verticalSpacerType(dc: ComponentManager) {
  dc.addType(type, {
    extend: TYPES.template,
    model: {
      defaults: {
        tagName: "div",
        name: "Spacer",
        icon: '<i class="gjs-badge__icon dm-icon dm-spacer"></i>',
        traits: [],
        resizable: {
          ...resizerNone,
          bc: true,
          keyHeight: "height",
          currentUnit: 1,
          minDim: 10,
          step: 1,
        },
        draggable: true,
        droppable: false,
        stylable: ["height"],
      },
      init() {
        this.addClass("h-75");
      },
    },
  });
}
