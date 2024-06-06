import { TYPES } from "../../componentTypes/constants";

export const TextBlock = {
  name: "dm-text",
  label: "Text",
  iconClass: "dm-text",
  content: { type: TYPES.text },
};

export const ImageBlock = {
  name: "image",
  label: "Image",
  iconClass: "dm-image",
  content: {
    type: TYPES.image,
  },
};

export const PageBreakBlock = {
  name: "page-break",
  label: "Page Break",
  iconClass: "fa-kit fa-dm-page-break-2",
  content: {
    type: TYPES.pageBreak,
  },
};

export const SpacerBlock = {
  name: "spacer",
  label: "Spacer",
  iconClass: "dm-icon dm-spacer",
  content: {
    type: TYPES.verticalSpacer,
  },
};

export const TokenBlock = {
  name: "dm-token",
  label: "Token",
  iconClass: "dm-icon dm-token",
  content: { type: TYPES.token },
};

// export const DividerBlock = {
//   name: "divider",
//   label: "Divider",
//   iconClass: "dm-icon dm-divider",
//   content: { type: TYPES.divider },
// };

export const CheckboxBlock = {
  name: "checkbox",
  label: "Checkbox",
  iconClass: "fa-regular fa-square-check",
  content: { type: TYPES.checkbox },
};

export const ButtonBlock = {
  name: "button",
  label: "Button",
  iconClass: "fa-sharp fa-light fa-toggle-on",
  content: { type: TYPES.button },
};

export const QRBlock = {
  name: "qrcode",
  label: "QR Code",
  iconClass: "fa-sharp fa-light fa-qrcode",
  content: { type: TYPES.qrcode },
};

export const BarcodeBlock = {
  name: "barcode",
  label: "Barcode",
  iconClass: "fa-sharp fa-solid fa-barcode",
  content: { type: TYPES.barcode },
};

const contentBlocks = [
  TextBlock,
  ImageBlock,
  SpacerBlock,
  PageBreakBlock,
  CheckboxBlock,
  ButtonBlock,
  QRBlock,
  BarcodeBlock,
];

export default contentBlocks;
