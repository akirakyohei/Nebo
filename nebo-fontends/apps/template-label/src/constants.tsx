import { GroupCategory } from "./types/category";
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
