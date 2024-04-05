import React, { CSSProperties } from "react";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from "react-virtualized-auto-sizer";
import { Box, Container, ContainerOwnProps, makeStyles } from "@mui/material";
import { CommonProps } from "@mui/material/OverridableComponent";
import { JSX } from "react/jsx-runtime";

const useStyles = makeStyles({
  container: {
    position: "relative",
  },
});

const ListRow = ({
  index,
  style,
  data,
}: {
  index: number;
  style: CSSProperties;
  data: React.ReactNode[];
}) => {
  return <Box sx={{ style }}>{data[index]}</Box>;
};

const ListContainer = (
  props: JSX.IntrinsicAttributes & {
    component: React.ElementType<any, keyof React.JSX.IntrinsicElements>;
  } & ContainerOwnProps &
    CommonProps &
    Omit<
      any,
      | "style"
      | "children"
      | "maxWidth"
      | "sx"
      | "className"
      | "fixed"
      | "classes"
      | "disableGutters"
    >
) => {
  return <Container maxWidth="sm" {...props} />;
};

interface Props {
  total: number;
  children: React.ReactNode[];
  onLoadMore?: () => void;
  loading: boolean;
  moreItem?: boolean;
}

export const ListBox = ({
  total,
  children,
  onLoadMore,
  moreItem,
  loading,
}: Props) => {
  const isItemLoaded = (index: number) =>
    index < children.length && children[index] !== null;
  const itemCount = total;
  return (
    <AutoSizer>
      {({ height, width }) => (
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={itemCount}
          loadMoreItems={!moreItem && onLoadMore ? onLoadMore : () => {}}
        >
          {({ onItemsRendered, ref }) => (
            <List
              className="List"
              height={height}
              width={width}
              itemCount={children.length}
              itemSize={230}
              itemData={children}
              innerElementType={ListContainer}
              onItemsRendered={onItemsRendered}
              ref={ref}
            >
              {ListRow}
            </List>
          )}
        </InfiniteLoader>
      )}
    </AutoSizer>
  );
};
