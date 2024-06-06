import {
  AddComponentTypeOptions,
  ComponentDefinition,
  ComponentManager,
} from "grapesjs";
import {
  GS_TYPES,
  GridSystemPluginOptions,
  MAX_COLUMNS,
  RESIZER_NONE,
  TYPES,
} from "../types";

export default (
  domComponents: ComponentManager,
  config: GridSystemPluginOptions
) => {
  const { tableProps = {} } = config;
  const type = tableProps.type || TYPES.row;
  const gsType = GS_TYPES.row;

  const defaultStyles = `
    .container {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
    padding: 5px !important;
  } 
  
  `;

  const def: AddComponentTypeOptions = {
    extend: "table",
    extendFn: ["initTraits"],
    model: {
      defaults: {
        name: "Row",
        columns: MAX_COLUMNS,
        droppable: false, // these components can be DROPPED INTO THIS one
        resizable: { ...RESIZER_NONE, bc: 1 },
        unstylable: ["padding"],
        styles: "",
        ...config.rowProps,
      },
      init() {
        this.afterInit();
      },
      afterInit() {},
    },
  };

  // Force default styles
  const { styles = "", attributes } = def?.model
    ?.defaults as ComponentDefinition;
  // const defaultStyles = ` [data-gjs-type="${gsType}"] { display:table; width:100%;table-layout:fixed; }`;

  (def?.model?.defaults as any).styles = styles + defaultStyles;
  (def?.model?.defaults as any).attributes = {
    ...attributes,
    "data-gjs-type": gsType,
  };

  domComponents.addType(type, def);
};
