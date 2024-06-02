import { ComponentManager } from "grapesjs";
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

  const def = {
    extend: "table",
    extendFn: ["initTraits"],
    model: {
      defaults: {
        name: "Row",
        columns: MAX_COLUMNS,
        droppable: false, // these components can be DROPPED INTO THIS one
        resizable: { ...RESIZER_NONE, bc: 1 },
        unstylable: ["padding"],
        ...config.rowProps,
      },
      init() {
        this.afterInit();
      },
      afterInit() {},
    },
  };

  // Force default styles
  const { styles = "", attributes } = def.model.defaults;
  const defaultStyles = ` [data-gjs-type="${gsType}"] { display:table; width:100%;table-layout:fixed; }`;

  def.model.defaults.styles = styles + defaultStyles;
  def.model.defaults.attributes = { ...attributes, "data-gjs-type": gsType };

  domComponents.addType(type, def);
};
