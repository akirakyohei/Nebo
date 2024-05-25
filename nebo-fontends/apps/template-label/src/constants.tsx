import { FileDataUpload, Template } from "./types";
import { GroupCategory } from "./types/category";
import blankThumbImage from "src/assets/img/new-blank-template.png";
import {
  AdjustOutlined,
  DateRangeOutlined,
  Inventory2Outlined,
  NewspaperOutlined,
  PieChartOutline,
  PrintOutlined,
  ThumbUpAltOutlined,
} from "@mui/icons-material";

export const TOKEN_HEADER = "nebo_authenticated";

export const GROUP_CATEGORIES: GroupCategory[] = [
  {
    id: 0,
    name: "Thương hiệu",
    icon: <AdjustOutlined />,
    description: "",
  },
  {
    id: 1,
    name: "Truyền thông kỹ thuật số & xã hội",
    icon: <ThumbUpAltOutlined />,
    description: "",
  },
  {
    id: 2,
    name: "Ngày lễ & sự kiện",
    icon: <DateRangeOutlined />,
    description: "",
  },
  {
    id: 3,
    name: "Quảng cáo tiếp thị",
    icon: <PieChartOutline />,
    description: "",
  },
  {
    id: 4,
    name: "Bao bì",
    icon: <Inventory2Outlined />,
    description: "",
  },
  {
    id: 5,
    name: "Trình bày & tài liệu",
    icon: <NewspaperOutlined />,
    description: "",
  },
  {
    id: 6,
    name: "In & xuất bản",
    icon: <PrintOutlined />,
    description: "",
  },
];

export const defaultBlankTemplate: Template = {
  name: "Mẫu mặc định",
  category_ids: [],
  paper_id: 1,
  assets: [],
  components: [],
  css: "",
  styles: "",
  html: "",
  is_active: true,
  options: {
    format: "A4 (210mm x 542mm)",
    height: "542mm",
    width: "210mm",
    is_landscape: false,
    margin: {
      bottom: "0px",
      left: "0px",
      right: "0px",
      top: "0px",
    },
  },
  thumbnail: {
    extension: "png",
    name: "blank",
    url: blankThumbImage,
    updated_at: "",
  },
  size: 0,
  created_on: "2024-05-24T17:18:41.959Z",
  updated_on: "2024-05-24T17:18:41.959Z",
  id: 0,
  user_id: 0,
  is_trashed: false,
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
