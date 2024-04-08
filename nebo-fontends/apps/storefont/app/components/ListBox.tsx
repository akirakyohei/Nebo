import React, { CSSProperties } from "react";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from "react-virtualized-auto-sizer";
import { Box, BoxProps, Container, ContainerOwnProps } from "@mui/material";
import { CommonProps } from "@mui/material/OverridableComponent";
import { JSX } from "react/jsx-runtime";
import { isArray } from "lodash-es";

const ListRowWrapper = ({
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

const Row = ({ children, ...props }: BoxProps) => {
  return <Box {...props}>{children}</Box>;
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
  ref: React.LegacyRef<any>;
  total: number;
  children: React.ReactNode;
  onLoadMore?: () => void;
  loading?: boolean;
  willLoadMoreResults?: boolean;
}

const ListBox = ({
  ref,
  total,
  children,
  onLoadMore,
  willLoadMoreResults,
  loading,
}: Props) => {
  const data = isArray(children) ? children : [children];
  const isItemLoaded = (index: number) =>
    index < data.length && data[index] !== null;
  return (
    <AutoSizer ref={ref}>
      {({ height, width }) => (
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={total}
          loadMoreItems={
            willLoadMoreResults && onLoadMore ? onLoadMore : () => {}
          }
        >
          {({ onItemsRendered, ref }) => (
            <List
              className="List"
              height={height}
              width={width}
              itemCount={data.length}
              itemSize={230}
              itemData={data}
              innerElementType={ListContainer}
              onItemsRendered={onItemsRendered}
              ref={ref}
            >
              {ListRowWrapper}
            </List>
          )}
        </InfiniteLoader>
      )}
    </AutoSizer>
  );
};

export default Object.assign(ListBox, {
  Row: Row,
});
