import { FileDataUpload, Template } from "./types";
import blankThumbImage from "src/assets/img/new-blank-template.png";

export const TOKEN_HEADER = "nebo_authenticated";

export const defaultBlankTemplate: Template = {
  name: "Mẫu mặc định",
  category_ids: [],
  paper_type_id: 2,
  assets: [],
  components: [],
  css: "",
  styles: "",
  html: "",
  active: true,
  options: {
    format: "A4 (210mm x 297mm)",
    height: "297mm",
    width: "210mm",
    landscape: false,
    margin: {
      bottom: "0px",
      left: "0px",
      right: "0px",
      top: "0px",
    },
  },
  thumbnail: null,
  size: 0,
  created_at: "2024-05-24T17:18:41.959Z",
  updated_at: "2024-05-24T17:18:41.959Z",
  id: 0,
  user_id: 0,
  trashed: false,
};

export const defaultFileUpload: FileDataUpload = {
  id: 0,
  file_name: "djksh djsknd dfjhsbknf fdjbn dsfjhbn fjdhbng fjnbg jfdng jgfnkbg",
  key: blankThumbImage,
  extension: "jepg",
  size: 0,
  created_at: "2024-05-24T17:18:41.959Z",
  updated_at: "2024-05-24T17:18:41.959Z",
};
