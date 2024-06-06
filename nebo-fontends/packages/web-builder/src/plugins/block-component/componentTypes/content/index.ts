import Text, { protectedCss as textComponentCss } from "./text";
import Image, { protectedCss as imageComponentCss } from "./image";
import VerticalSpacer, {
  protectedCss as verticalSpacerComponentCss,
} from "./verticalSpacer";
import PageBreak, { protectedCss as pageBreakComponentCss } from "./pageBreak";
import Checkbox, { protectedCss as checkboxCss } from "./checkbox";
import Button, { protectedCss as buttonComponentCss } from "./button";
import QR, { protectedCss as qrComponentCss } from "./QR";
import Barcode, { protectedCss as barcodeComponentCss } from "./barcode";
import Link, { protectedCss as linkComponentCss } from "./link";
// import Token from './Token'

export const protectedCss = `
  /* 
   * CONTENT COMPONENTS 
   **************************/
  ${textComponentCss}
  ${imageComponentCss}
  ${verticalSpacerComponentCss}
  ${pageBreakComponentCss}
  ${checkboxCss}
  ${buttonComponentCss}
  ${qrComponentCss}
  ${barcodeComponentCss}
  ${linkComponentCss}
`;

const allContentTypes = [
  Text,
  Image,
  VerticalSpacer,
  PageBreak,
  Link,
  Checkbox,
  Button,
  QR,
  Barcode,
];

export default allContentTypes;
