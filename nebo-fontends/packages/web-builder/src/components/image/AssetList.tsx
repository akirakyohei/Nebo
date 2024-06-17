import React, { useState, ReactNode } from "react";
import { mdiChevronDown, mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { AssetFile } from "../../types/template";
import { Asset } from "grapesjs";
import { useEditor } from "@grapesjs/react";

export interface AssetListProps {
  assets: Asset[];
  onSelect: (asset: Asset, complete?: boolean | undefined) => void;
  onRemove: (asset: Asset) => void;
  moreAssets?: (props: {
    select: (asset: AssetFile, complete?: boolean | undefined) => void;
  }) => ReactNode;
}
export const AssetList = ({
  assets,
  onRemove,
  onSelect,
  moreAssets,
}: AssetListProps) => {
  const editor = useEditor();

  const [expanded, setExpanded] = useState<string | false>("panel1");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  return (
    <Box>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary expandIcon={<Icon path={mdiChevronDown} size={1} />}>
          Ảnh trong mẫu
        </AccordionSummary>
        <AccordionDetails sx={{ paddingTop: 0, paddingBottom: 1 }}>
          <Box sx={{ background: "#fafafa", borderRadius: "3px", padding: 2 }}>
            {assets.length === 0 && (
              <Typography sx={{ padding: 2 }} color={"GrayText"}>
                Chưa có ảnh nào
              </Typography>
            )}
            <Grid
              display={"grid"}
              gridTemplateColumns={{
                xs: "1fr",
                sm: "1fr 1fr",
              }}
              gap={2}
            >
              {assets.map((asset, index) => (
                <Box
                  key={index}
                  sx={(theme) => ({
                    borderRadius: "3px",
                    boxShadow: theme.shadows[2],
                    position: "relative",
                  })}
                >
                  <IconButton
                    type="button"
                    onClick={() => onRemove(asset)}
                    sx={{
                      position: "absolute",
                      padding: 0,
                      top: "-8px",
                      right: "-8px",
                    }}
                  >
                    <Icon size={1} path={mdiClose} />
                  </IconButton>
                  <Box
                    key={asset.getSrc()}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      ":hover": { cursor: "pointer" },
                    }}
                  >
                    <Box
                      component="img"
                      className="display-block"
                      width={100}
                      height={100}
                      src={asset.getSrc()}
                      alt={asset.getFilename()}
                      onDoubleClick={() => onSelect(asset, true)}
                    />
                  </Box>
                </Box>
              ))}
            </Grid>
          </Box>
        </AccordionDetails>
      </Accordion>
      {!!moreAssets && (
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<Icon path={mdiChevronDown} size={1} />}
          >
            Nhiều hơn
          </AccordionSummary>
          <AccordionDetails sx={{ paddingTop: 0, paddingBottom: 1 }}>
            <Box sx={{ background: "#fafafa", borderRadius: "3px" }}>
              {moreAssets({
                select: (asset, complete) =>
                  onSelect(
                    new editor.AssetManager.Asset({
                      type: asset.type,
                      src: asset.src,
                      name: asset.name,
                    }),
                    complete
                  ),
              })}
            </Box>
          </AccordionDetails>
        </Accordion>
      )}
    </Box>
  );
};
