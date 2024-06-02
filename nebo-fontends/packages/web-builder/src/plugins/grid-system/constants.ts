import {
  BLOCKS,
  GridSystemPluginOptions,
  MAX_GRID,
  OLD_MAX_GRID,
} from "./types";

export const defaultOptions: GridSystemPluginOptions = {
  blocks: [BLOCKS.row, BLOCKS.column],

  rowBlock: {},
  rowProps: {},

  columnsProps: {},

  columnBlock: {},
  columnProps: {},

  maxGrid: MAX_GRID,
  oldMaxGrid: OLD_MAX_GRID,
  columnName: "dm-column-2",
  mainComponent: "wrapper",
};
export default defaultOptions;
