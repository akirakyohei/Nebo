import { useState } from "react";
import { BlocksResultProps } from "@grapesjs/react";
import { Box, Collapse, Grid, Grow, Stack, Typography } from "@mui/material";
import { cx } from "./common";
import { useToggle } from "../useToggle";
import Icon from "@mdi/react";
import { mdiChevronDown, mdiChevronRight, mdiChevronUp } from "@mdi/js";

export type CustomBlockManagerProps = Pick<
  BlocksResultProps,
  "mapCategoryBlocks" | "dragStart" | "dragStop"
>;

export default function BlockManager({
  mapCategoryBlocks,
  dragStart,
  dragStop,
}: CustomBlockManagerProps) {
  return (
    <div id="nebo-block" className="gjs-custom-block-manager text-left">
      {Array.from(mapCategoryBlocks).map(([category, blocks]) => (
        <CategoryBlock
          key={category}
          category={category}
          blocks={blocks}
          dragStart={dragStart}
          dragStop={dragStop}
        />
      ))}
    </div>
  );
}

interface CategoryProps
  extends Pick<CustomBlockManagerProps, "dragStart" | "dragStop"> {
  category: string;
  blocks: BlocksResultProps["blocks"];
}

const CategoryBlock = ({
  category,
  blocks,
  dragStart,
  dragStop,
}: CategoryProps) => {
  const { value: isOpen, toggle: toggleOpen } = useToggle(false);

  return (
    <Box key={category}>
      <Box
        sx={{
          background: "var(--gjs-primary-color)",
          color: "var(--gjs-font-color)",
          borderBottom: "1px solid var( --gjs-border-color)",
          boxShadow: isOpen
            ? `rgba(33, 35, 38, 0.3) 0px 10px 10px -10px;`
            : undefined,
          "&:hover": {
            cursor: "pointer",
          },
        }}
        padding={2}
        onClick={toggleOpen}
        display={"flex"}
        justifyContent={"space-between"}
      >
        <Typography sx={{ flex: "1", textAlign: "center" }}>
          {category}
        </Typography>
        {isOpen ? (
          <Icon path={mdiChevronDown} size="24px" />
        ) : (
          <Icon path={mdiChevronRight} size="24px" />
        )}
      </Box>
      <Collapse in={isOpen}>
        <Grid
          display={"grid"}
          gridTemplateColumns={"1fr 1fr"}
          padding={1}
          paddingTop={2}
          paddingBottom={2}
          gap={2}
        >
          {blocks.map((block) => (
            <BlockItem
              key={block.getId()}
              block={block}
              dragStart={dragStart}
              dragStop={dragStop}
            />
          ))}
        </Grid>
      </Collapse>
    </Box>
  );
};

interface BlockProps
  extends Pick<CustomBlockManagerProps, "dragStart" | "dragStop"> {
  block: BlocksResultProps["blocks"][number];
}

const BlockItem = ({ block, dragStart, dragStop }: BlockProps) => {
  return (
    <Box
      key={block.getId()}
      draggable
      onDragStart={(ev) => dragStart(block, ev.nativeEvent)}
      onDragEnd={() => dragStop(false)}
      sx={(theme) => ({
        border: "1px solid var(--gjs-primary-color)",
        color: "var(--gjs-font-primary-color)",
        borderRadius: "5px",
        boxShadow: theme.shadows[1],
        padding: 2,
        "&:hover": {
          cursor: "pointer",
        },
      })}
    >
      <Stack justifyContent={"space-between"}>
        <Box
          dangerouslySetInnerHTML={{
            __html:
              block.getMedia() ||
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m0 16H5V5h14zm-2-2H7V7h10z"/></svg>`,
          }}
        />
        <Box className="text-sm text-center w-full" title={block.getLabel()}>
          {block.getLabel()}
        </Box>
      </Stack>
    </Box>
  );
};
