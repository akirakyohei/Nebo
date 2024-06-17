import { Box, Button, Card, CardHeader } from "@mui/material";
import { Category, ListResponse } from "../../../../types";
import { DefaultCarouselCarousel } from "./DefaultCategoryCarousel";

interface Props {
  categories: ListResponse<Category>;
}

export const CategoryCard = ({ categories }: Props) => {
  if (categories.metadata.total_element === 0)
    return (
      <Card>
        <CardHeader title="Mẫu cập nhật gần đây" />
        <Box padding={3}>
          <Button
            variant="contained"
            href="/documents/categories?action=create"
          >
            Bắt đầu tạo thư mục
          </Button>
        </Box>
      </Card>
    );

  return (
    <DefaultCarouselCarousel
      active={Math.ceil(categories.data.length / 2)}
      data={categories.data}
    />
  );
};
