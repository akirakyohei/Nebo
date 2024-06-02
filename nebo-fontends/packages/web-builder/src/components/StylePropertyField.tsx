import * as React from "react";
import { useEditor } from "@grapesjs/react";
import {
  mdiArrowDownDropCircle,
  mdiArrowUpDropCircle,
  mdiClose,
  mdiDelete,
  mdiMenuDown,
  mdiMenuUp,
  mdiPlus,
} from "@mdi/js";
import Icon from "@mdi/react";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import type {
  Property,
  PropertyComposite,
  PropertyNumber,
  PropertyRadio,
  PropertySelect,
  PropertySlider,
  PropertyStack,
} from "grapesjs";
import { BTN_CLS, ROUND_BORDER_COLOR, cx } from "./common";
import {
  Box,
  Stack,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
  ButtonGroup,
} from "@mui/material";

interface StylePropertyFieldProps extends React.HTMLProps<HTMLDivElement> {
  prop: Property;
}

export default function StylePropertyField({
  prop,
  ...rest
}: StylePropertyFieldProps) {
  const editor = useEditor();
  const handleChange = (value: string) => {
    prop.upValue(value);
  };

  const onChange = (ev: any) => {
    handleChange(ev.target.value);
  };

  const openAssets = () => {
    const { Assets } = editor;
    Assets.open({
      select: (asset, complete) => {
        console.log({ complete });
        prop.upValue(asset.getSrc(), { partial: !complete });
        complete && Assets.close();
      },
      types: ["image"],
      accept: "image/*",
    });
  };

  const type = prop.getType();
  const defValue = prop.getDefaultValue();
  const canClear = prop.canClear();
  const hasValue = prop.hasValue();
  const value = prop.getValue();
  const valueString = hasValue ? value : "";
  const valueWithDef = hasValue ? value : defValue;

  let inputToRender = (
    <TextField
      placeholder={defValue}
      value={valueString}
      onChange={onChange}
      size="small"
      fullWidth
      sx={{ background: "var(--gjs-primary-color)" }}
    />
  );

  switch (type) {
    case "radio":
      {
        const radioProp = prop as PropertyRadio;
        inputToRender = (
          <RadioGroup value={value} onChange={onChange} row>
            {radioProp.getOptions().map((option) => (
              <FormControlLabel
                key={radioProp.getOptionId(option)}
                value={radioProp.getOptionId(option)}
                label={radioProp.getOptionLabel(option)}
                control={<Radio size="small" />}
              />
            ))}
          </RadioGroup>
        );
      }
      break;
    case "select":
      {
        const selectProp = prop as PropertySelect;
        inputToRender = (
          <FormControl fullWidth size="small">
            <Select
              value={value}
              onChange={onChange}
              sx={{ background: "var(--gjs-primary-color)" }}
            >
              {selectProp.getOptions().map((option) => (
                <MenuItem
                  key={selectProp.getOptionId(option)}
                  value={selectProp.getOptionId(option)}
                >
                  {selectProp.getOptionLabel(option)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      }
      break;
    case "color":
      {
        inputToRender = (
          <TextField
            fullWidth
            placeholder={defValue}
            value={valueString}
            onChange={onChange}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <div
                    className={`w-[15px] h-[15px] ${ROUND_BORDER_COLOR}`}
                    style={{ backgroundColor: valueWithDef }}
                  >
                    <input
                      type="color"
                      className="w-[15px] h-[15px] cursor-pointer opacity-0"
                      value={valueWithDef}
                      onChange={(ev) => handleChange(ev.target.value)}
                    />
                  </div>
                </InputAdornment>
              ),
            }}
          />
        );
      }
      break;
    case "slider":
      {
        const sliderProp = prop as PropertySlider;
        inputToRender = (
          <Slider
            size="small"
            value={parseFloat(value)}
            min={sliderProp.getMin()}
            max={sliderProp.getMax()}
            step={sliderProp.getStep()}
            onChange={onChange}
            valueLabelDisplay="auto"
          />
        );
      }
      break;
    case "file":
      {
        inputToRender = (
          <div className="flex flex-col items-center gap-3">
            {value && value !== defValue && (
              <div
                className="w-[50px] h-[50px] rounded inline-block bg-cover bg-center cursor-pointer"
                style={{ backgroundImage: `url("${value}")` }}
                onClick={() => handleChange("")}
              />
            )}
            <button type="button" onClick={openAssets} className={BTN_CLS}>
              Select Image
            </button>
          </div>
        );
      }
      break;
    case "composite":
      {
        const compositeProp = prop as PropertyComposite;
        inputToRender = (
          <div
            className={cx("flex flex-wrap p-2 bg-black/20", ROUND_BORDER_COLOR)}
          >
            {compositeProp.getProperties().map((prop) => (
              <StylePropertyField key={prop.getId()} prop={prop} />
            ))}
          </div>
        );
      }
      break;
    case "stack":
      {
        const stackProp = prop as PropertyStack;
        const layers = stackProp.getLayers();
        const isTextShadow = stackProp.getName() === "text-shadow";
        inputToRender = (
          <div
            className={cx(
              "flex flex-col p-2 gap-2 bg-black/20 min-h-[54px]",
              ROUND_BORDER_COLOR
            )}
          >
            {layers.map((layer) => (
              <div key={layer.getId()} className={ROUND_BORDER_COLOR}>
                <div className="flex gap-1 bg-slate-800 px-2 py-1 items-center">
                  <IconButton
                    size="small"
                    onClick={() => layer.move(layer.getIndex() - 1)}
                  >
                    <Icon size={0.7} path={mdiArrowUpDropCircle} />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => layer.move(layer.getIndex() + 1)}
                  >
                    <Icon size={0.7} path={mdiArrowDownDropCircle} />
                  </IconButton>
                  <button className="flex-grow" onClick={() => layer.select()}>
                    {layer.getLabel()}
                  </button>
                  <div
                    className={cx(
                      "bg-white min-w-[17px] min-h-[17px] text-black text-sm flex justify-center",
                      ROUND_BORDER_COLOR
                    )}
                    style={layer.getStylePreview({
                      number: { min: -3, max: 3 },
                      camelCase: true,
                    })}
                  >
                    {isTextShadow && "T"}
                  </div>
                  <IconButton size="small" onClick={() => layer.remove()}>
                    <Icon size={0.7} path={mdiDelete} />
                  </IconButton>
                </div>
                {layer.isSelected() && (
                  <div className="p-2 flex flex-wrap">
                    {stackProp.getProperties().map((prop) => (
                      <StylePropertyField key={prop.getId()} prop={prop} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      }
      break;
    case "number":
      {
        const numberProp = prop as PropertyNumber;
        const value = numberProp.getValue();

        inputToRender = (
          <Box display={"flex"} gap={1} flexDirection={"column"}>
            {numberProp.attributes.fixedValues &&
            numberProp.attributes.fixedValues.length > 0 ? (
              <FormControl fullWidth size="small">
                <ToggleButtonGroup
                  size="small"
                  value={value}
                  exclusive
                  onChange={onChange}
                >
                  {numberProp.attributes.fixedValues.map((option) => (
                    <ToggleButton
                      key={option}
                      value={option}
                      aria-label="left aligned"
                    >
                      {option}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </FormControl>
            ) : null}

            <ButtonGroup fullWidth sx={{ gap: 1 }}>
              <FormControl size="small">
                <TextField
                  placeholder={defValue}
                  value={valueString}
                  onChange={onChange}
                  size="small"
                  fullWidth
                  sx={{ background: "var(--gjs-primary-color)" }}
                  InputProps={{
                    endAdornment: (
                      <Stack width={"24px"}>
                        <IconButton
                          sx={{ padding: 0 }}
                          onClick={() => {
                            const _value = Number(numberProp.getValue()) || 0;
                            numberProp.upValue(
                              `${_value + numberProp.getStep()}`
                            );
                          }}
                        >
                          <Icon path={mdiMenuUp} />
                        </IconButton>

                        <IconButton
                          sx={{ padding: 0 }}
                          onClick={() => {
                            const _value = Number(numberProp.getValue()) || 0;
                            numberProp.upValue(
                              `${_value - numberProp.getStep()}`
                            );
                          }}
                        >
                          <Icon path={mdiMenuDown} />
                        </IconButton>
                      </Stack>
                    ),
                  }}
                />
              </FormControl>
              {numberProp.getUnits().length > 0 ? (
                <FormControl size="small" style={{ minWidth: "65px" }}>
                  <Select
                    disabled={isNaN(Number(value))}
                    value={numberProp.getUnit()}
                    onChange={(e) => {
                      numberProp.upUnit(e.target.value);
                    }}
                    sx={{ background: "var(--gjs-primary-color)" }}
                  >
                    {numberProp.getUnits().map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : null}
            </ButtonGroup>
          </Box>
        );
      }
      break;
  }

  return (
    <div
      {...rest}
      className={cx("mb-3 px-1", prop.isFull() ? "w-full" : "w-1/2")}
    >
      <div className={cx("flex mb-2 items-center", canClear && "text-sky-300")}>
        <div className="flex-grow capitalize">{prop.getLabel()}</div>
        {canClear && (
          <button
            onClick={() => prop.clear()}
            style={{ border: "1px solid", borderRadius: "3px" }}
          >
            <Icon path={mdiClose} size={0.7} />
          </button>
        )}
        {type === "stack" && (
          <IconButton
            size="small"
            className="!ml-2"
            onClick={() => (prop as PropertyStack).addLayer({}, { at: 0 })}
          >
            <Icon size={1} path={mdiPlus} />
          </IconButton>
        )}
      </div>
      {inputToRender}
    </div>
  );
}
