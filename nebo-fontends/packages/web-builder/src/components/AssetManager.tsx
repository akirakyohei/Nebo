import * as React from "react";
import { AssetsResultProps, useEditor } from "@grapesjs/react";
import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import type { Asset } from "grapesjs";
import { BTN_CLS } from "./common";
import { UploadImage } from "./UploadImage";
import { FileUploadData } from "../types/template";
import { Box, Grid, Stack } from "@mui/material";

export type CustomAssetManagerProps = Pick<
  AssetsResultProps,
  "assets" | "close" | "select"
> & {
  showToast: (value: string, option?: { isError?: boolean }) => void;
  uploadFile: (file: FileUploadData) => void;
};

export default function AssetManager({
  assets,
  select,
  uploadFile,
  showToast,
}: CustomAssetManagerProps) {
  const editor = useEditor();

  const remove = (asset: Asset) => {
    editor.Assets.remove(asset);
  };

  return (
    <Grid
      display={"grid"}
      gridTemplateColumns={"50% auto"}
      gap={1}
      height={"50vh"}
    >
      <Box>
        <UploadImage showToast={showToast} uploadFile={uploadFile} />
      </Box>
      <Box>
        {assets.map((asset) => (
          <Box
            key={asset.getSrc()}
            // className="relative group rounded overflow-hidden"
          >
            <img
              className="display-block"
              width={40}
              height={40}
              src={asset.getSrc()}
            />
            <div>
              <button
                type="button"
                className={BTN_CLS}
                onClick={() => select(asset, true)}
              >
                Select
              </button>
              <button
                type="button"
                className="absolute top-2 right-2"
                onClick={() => remove(asset)}
              >
                <Icon size={1} path={mdiClose} />
              </button>
            </div>
          </Box>
        ))}
      </Box>
    </Grid>
  );
}
