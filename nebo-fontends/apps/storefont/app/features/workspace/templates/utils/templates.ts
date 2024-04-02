import { Category, CategoryByGroup } from "../../../../types";

export const getCategory = (
  categoryId: number,
  categoryByGroups: CategoryByGroup[]
): Category | undefined => {
  let category: Category | undefined = undefined;
  categoryByGroups.forEach((group) => {
    category = group.categories.find((item) => item.id === categoryId);
    if (category) return;
  });
  return category;
};
