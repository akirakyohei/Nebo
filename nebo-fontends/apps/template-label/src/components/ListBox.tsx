import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";
import useMediaQuery from "@mui/material/useMediaQuery";
import ListSubheader from "@mui/material/ListSubheader";
import Popper from "@mui/material/Popper";
import { useTheme, styled } from "@mui/material/styles";
import { VariableSizeList, ListChildComponentProps } from "react-window";
import Typography from "@mui/material/Typography";
import { Spinner } from "./Spinner";
import InfiniteLoader from "react-window-infinite-loader";
import { Box } from "@mui/material";

const LISTBOX_PADDING = 8; // px

function renderRow(props: ListChildComponentProps) {
  const { data, index, style } = props;
  const dataSet = data[index];
  const inlineStyle = {
    ...style,
    top: (style.top as number) + LISTBOX_PADDING,
  };

  return (
    <Box {...dataSet[0]} style={inlineStyle}>
      {dataSet}
    </Box>
  );
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

// function useResetCache(data: any) {
//   const ref = React.useRef<VariableSizeList>(null);
//   React.useEffect(() => {
//     if (ref.current != null) {
//       ref.current.resetAfterIndex(0, true);
//     }
//   }, [data]);
//   return ref;
// }

// Adapter for react-window
export const ListboxComponent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLElement> & {
    loading?: boolean;
    willLoadMoreResults?: boolean;
    total?: number;
    onLoadMore?: () => void;
  }
>(function ListboxComponent(props, ref) {
  const {
    children,
    total,
    onLoadMore,
    willLoadMoreResults,
    loading,
    ...other
  } = props;
  const itemData: React.ReactElement[] = [];
  (children as React.ReactElement[]).forEach(
    (item: React.ReactElement & { children?: React.ReactElement[] }) => {
      itemData.push(item);
      itemData.push(...(item.children || []));
    }
  );

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"), {
    noSsr: true,
  });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = (child: React.ReactElement) => {
    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const isItemLoaded = (index: number) =>
    index < itemData.length && itemData[index] !== null;
  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={total || 0}
          loadMoreItems={
            willLoadMoreResults && onLoadMore ? onLoadMore : () => {}
          }
        >
          {({ onItemsRendered, ref }) => (
            <VariableSizeList
              ref={ref}
              itemData={itemData}
              height={getHeight() + 2 * LISTBOX_PADDING}
              width="100%"
              outerElementType={OuterElementType}
              innerElementType="ul"
              itemSize={(index) => getChildSize(itemData[index])}
              overscanCount={5}
              itemCount={itemCount}
              onItemsRendered={onItemsRendered}
            >
              {renderRow}
            </VariableSizeList>
          )}
        </InfiniteLoader>
        {loading && (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 1,
            }}
          >
            <Spinner />
          </Box>
        )}
      </OuterElementContext.Provider>
    </div>
  );
});
