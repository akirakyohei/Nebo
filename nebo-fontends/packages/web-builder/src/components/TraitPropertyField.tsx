import * as React from "react";
import { TraitsProvider, useEditor } from "@grapesjs/react";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import type { Property, PropertyNumber, Trait } from "grapesjs";
import { ROUND_BORDER_COLOR, cx } from "./common";
import {
  Box,
  ButtonGroup,
  IconButton,
  Stack,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { mdiMenuDown, mdiMenuUp } from "@mdi/js";
import Icon from "@mdi/react";
import TraitManager from "./TraitManger";

interface StylePropertyFieldProps extends React.HTMLProps<HTMLDivElement> {
  trait: Trait;
}

export default function TraitPropertyField({
  trait,
  ...rest
}: StylePropertyFieldProps) {
  const editor = useEditor();
  const handleChange = (value: string) => {
    debugger;
    trait.setValue(value);
  };

  const onChange = (ev: any) => {
    handleChange(ev.target.value);
  };

  const handleButtonClick = () => {
    const command = trait.get("command");
    if (command) {
      typeof command === "string"
        ? editor.runCommand(command)
        : command(editor, trait);
    }
  };

  const type = trait.getType();
  const defValue = trait.getDefault() || trait.attributes.placeholder;
  const value = trait.getValue();
  const valueWithDef = typeof value !== "undefined" ? value : defValue;

  let inputToRender = (
    <TextField
      placeholder={defValue}
      value={value}
      onChange={onChange}
      size="small"
      fullWidth
      sx={{ background: "var(--gjs-primary-color)" }}
    />
  );

  switch (type) {
    case "select":
      {
        inputToRender = (
          <FormControl fullWidth size="small">
            <Select
              value={value}
              onChange={onChange}
              sx={{ background: "var(--gjs-primary-color)" }}
            >
              {trait.getOptions().map((option) => (
                <MenuItem
                  key={trait.getOptionId(option)}
                  value={trait.getOptionId(option)}
                >
                  {trait.getOptionLabel(option)}
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
            value={value}
            onChange={onChange}
            size="small"
            sx={{ background: "var(--gjs-primary-color)" }}
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
    case "checkbox":
      {
        inputToRender = (
          <Checkbox
            checked={value}
            onChange={(ev) => trait.setValue(ev.target.checked)}
            size="small"
          />
        );
      }
      break;
    case "button":
      {
        inputToRender = (
          <Button fullWidth onClick={handleButtonClick}>
            {trait.getLabel()}
          </Button>
        );
      }
      break;
    case "number":
      {
        inputToRender = (
          <FormControl fullWidth size="small">
            <TextField
              placeholder={defValue}
              value={value}
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
                        const _value = Number(value) || 0;
                        handleChange(`${_value + 1}`);
                      }}
                    >
                      <Icon path={mdiMenuUp} />
                    </IconButton>

                    <IconButton
                      sx={{ padding: 0 }}
                      onClick={() => {
                        const _value = Number(value) || 0;
                        handleChange(`${_value - 1}`);
                      }}
                    >
                      <Icon path={mdiMenuDown} />
                    </IconButton>
                  </Stack>
                ),
              }}
            />
          </FormControl>
        );
      }
      break;
    case "switch": {
      // const value = props as Property;
      inputToRender = (
        <Box>
          <Switch
            checked={value}
            onChange={(ev) => trait.setValue(ev.target.checked)}
          />
        </Box>
      );
      break;
    }
  }

  return (
    <div {...rest} className={cx("mb-3 px-1 w-full")}>
      <div className={cx("flex mb-2 items-center")}>
        <div className="flex-grow capitalize">{trait.getLabel()}</div>
      </div>
      {inputToRender}
    </div>
  );
}
