import Column, { protectedCss as columnComponentCss } from "./column";
import Row, { protectedCss as rowComponentCss } from "./row";
// import Columns from './Columns'
// import Grid from './Grid'
// import GridItem from './GridItem'

export const protectedCss = `
  /* 
   * LAYOUT COMPONENTS 
   **************************/
  ${rowComponentCss}
  ${columnComponentCss}
`;
const allLayoutTypes = [Column, Row];

export default allLayoutTypes;
