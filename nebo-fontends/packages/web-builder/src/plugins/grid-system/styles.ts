import { Editor } from "grapesjs";
import { GridSystemPluginOptions, TYPES } from "./types";

export const defaultGridStyle =
  `
*[data-gjs-type='` +
  TYPES.row +
  `']:empty {
  min-height: 100px;
}

*[data-gjs-type='` +
  TYPES.row +
  `']:empty,
*[data-gjs-type='` +
  TYPES.column +
  `']:empty {
  min-height: 100px;
  position: relative;
  color: inherit;
}

*[data-gjs-type='` +
  TYPES.row +
  `']:empty:before,
*[data-gjs-type='` +
  TYPES.column +
  `']:empty:before {
  content: '';
  height: calc(100% - 14px);
  background-size: 80% clamp(20px, 50%, 50px);
  background-repeat: no-repeat;
  border-radius: 4px;
  background-position: center;
  z-index: 1;
  background-color: #EADFFE !important;
  border: 2px solid #C6A9FD;
  min-height: 100px;
  margin: 5px;
  display: block;
}

*[data-gjs-type^='dm-']:empty:before,
*[data-gjs-type^='dm-']:empty:after {
  color: #838caa !important;
  /* font-family: Inter, Helvetica, Arial; */
  display: block;
}

.gjs-hovered[data-gjs-type='` +
  TYPES.row +
  `']:empty:before,
.gjs-hovered[data-gjs-type='` +
  TYPES.column +
  `']:empty:before {
  background-color: #EADFFE !important;
}

*[data-gjs-type='` +
  TYPES.row +
  `']:empty {
  min-height: 100px;
}

*[data-gjs-type='` +
  TYPES.column +
  `']:empty:before {
    background-color: #EADFFE!important;
  background-image: url('` +
  `');
}
.gjs-row:empty,.gjs-cell:empty{
  content: '';
  height: calc(100% - 14px);
  background-size: 80% clamp(20px, 50%, 50px);
  background-repeat: no-repeat;
  border-radius: 4px;
  background-position: center;
  z-index: 1;
  background-color: #EADFFE !important;
  border: 2px solid #C6A9FD;
  min-height: 100px;
  margin: 5px;
  display: block;

}
`;
export default (editor: Editor, opts: GridSystemPluginOptions) => {
  editor.EditorModel.Css.addRules(defaultGridStyle);
};
