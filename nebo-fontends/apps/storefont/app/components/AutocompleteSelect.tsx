import {
  Autocomplete,
  Checkbox,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { Option } from "./types";
import { isArray } from "lodash-es";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import { ListBox } from "./ListBox";
import React from "react";

type Value = number | string;
interface Props<T extends Value> {
  values: T[];
  options: Option<T>[];
  onChange: (_values: T[]) => void;
  multiple?: boolean;
  label?: TextFieldProps["label"];
  variant?: TextFieldProps["variant"];
  placeholder?: TextFieldProps["placeholder"];
}

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;

export function AutocompleteSelect<T extends Value>({
  multiple,
  values,
  options,
  onChange,
  ...props
}: Props<T>) {
  const seletedOptions = options.filter((item) => values.includes(item.value));

  const ListBoxComponent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLElement>
  >((props) => <ListBox total={0} children={[]} loading={false} {...props} />);

  return (
    <Autocomplete
      value={seletedOptions}
      multiple={multiple}
      id="tags-outlined"
      options={options}
      getOptionKey={(option) => option.value}
      getOptionLabel={(option) => option.label}
      getOptionDisabled={(option) => option.disabled || false}
      ListboxComponent={ListBoxComponent}
      onChange={(_event, _value) => {
        onChange(isArray(_value) ? _value.map((item) => item.value) : []);
      }}
      limitTags={4}
      renderOption={
        multiple
          ? (props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.label}
              </li>
            )
          : undefined
      }
      filterSelectedOptions
      renderInput={(params) => <TextField {...params} {...props} />}
    />
  );
}
