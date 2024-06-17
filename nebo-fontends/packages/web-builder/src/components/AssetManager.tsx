import * as React from "react";
import { AssetsResultProps, useEditor } from "@grapesjs/react";
import type { Asset } from "grapesjs";
import { UploadImage } from "./image/UploadImage";
import { FileUploadData } from "../types/template";
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { AssetList, AssetListProps } from "./image/AssetList";
import _ from "lodash";
import Utils from "../utils";

export type CustomAssetManagerProps = Pick<
  AssetsResultProps,
  "assets" | "close" | "select"
> & {
  showToast: (value: string, option?: { isError?: boolean }) => void;
  uploadFile: (file: FileUploadData) => Promise<string | null>;
  moreAssets?: AssetListProps["moreAssets"];
};

export default function AssetManager({
  assets,
  select,
  moreAssets,
  uploadFile,
  showToast,
}: CustomAssetManagerProps) {
  const editor = useEditor();
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);

  const handleRemove = (asset: Asset) => {
    editor.Assets.remove(asset);
  };
  const handleAddImage = () => {
    if (imageUrl) {
      if (!Utils.isUrl(imageUrl)) {
        showToast?.("Đường dẫn không hợp lệ", { isError: true });
        return;
      }
      editor.Assets.add(imageUrl);
      setImageUrl(null);
    }
  };

  const handleUploadImage = async (file: FileUploadData) => {
    if (!file) return;
    const url = await uploadFile(file);
    if (url) editor.Assets.add(url);
  };

  return (
    <Grid
      display={"grid"}
      gridTemplateColumns={"50% auto"}
      gap={1}
      minHeight={"50vh"}
    >
      <Stack gap={2}>
        <Box>
          <Typography>1{`)`} Nhập ảnh bằng đường dẫn</Typography>
          <Stack direction={"row"} gap={2} justifyContent={"space-between"}>
            <Box sx={{ flex: "1 1 auto" }}>
              <TextField
                fullWidth
                value={imageUrl || ""}
                label="Đường dẫn"
                placeholder="Nhập bằng đường dẫn"
                error={!!imageUrl && !Utils.isUrl(imageUrl)}
                onChange={(event) => setImageUrl(event.target.value)}
                InputLabelProps={{ sx: { top: "-6px" } }}
                InputProps={{
                  sx: {
                    height: "38px",
                    "> input": {
                      padding: "0 16px !important",
                      height: "100% !important",
                    },
                  },
                }}
              />
            </Box>

            <Button
              variant="contained"
              disabled={!imageUrl}
              onClick={handleAddImage}
            >
              Thêm
            </Button>
          </Stack>
        </Box>
        <Box
          sx={{ flex: "1 1 auto", display: "flex", flexDirection: "column" }}
        >
          <Typography>2{`)`}Tải ảnh lên</Typography>
          <Box sx={{ flex: "1 1 auto" }}>
            <UploadImage showToast={showToast} uploadFile={handleUploadImage} />
          </Box>
        </Box>
      </Stack>
      <Box>
        <AssetList
          assets={assets}
          onSelect={select}
          onRemove={handleRemove}
          moreAssets={moreAssets}
        />
      </Box>
    </Grid>
  );
}
