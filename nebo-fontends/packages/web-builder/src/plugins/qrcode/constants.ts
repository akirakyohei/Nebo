import { QrcodePluginOptions } from "./types";

export const cmpId = "qr-code";

export const defaultOptions: QrcodePluginOptions = {
  blocks: [cmpId],
  // default options
  script: "https://cdnjs.cloudflare.com/ajax/libs/qrious/4.0.2/qrious.min.js",
  api: "https://barcodes-xdm4ptfota-uc.a.run.app/api/v1/qrcodes",
  // Object to extend the default block, eg. `{ label: '', ... }`
  // Pass a falsy value to avoid adding the block
  blockQrcode: {
    label: "Qrcode",
    content: {
      type: cmpId,
    },
  },

  // Customize the component props. The final object should be returned
  // from the function.
  /**
  eg. Here an example of how you would customize component's traits
  `props => {
      props.traits = props.traits.map(trait => {
        if (trait.name == 'strings') {
          trait.label = 'Custom <b>trait<b/> label';
        }
        // this trait will be removed
        if (trait.name == 'theme') return;
        return trait;
      }).filter(i => i);
      return props;
  }`
 */
  props: (i) => i,
  // Component props
  component: {},
};

export default defaultOptions;
