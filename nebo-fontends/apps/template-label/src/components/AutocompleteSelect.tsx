import {
  Autocomplete,
  Checkbox,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { Option } from "./types";
import { isArray } from "lodash-es";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import ListBox from "./ListBox";
import React, { CSSProperties } from "react";

type Value = number | string;
interface Props<T extends Value> {
  id?: string;
  values: T[];
  options: Option<T>[];
  onChange: (_values: T[]) => void;
  multiple?: boolean;
  label?: TextFieldProps["label"];
  variant?: TextFieldProps["variant"];
  placeholder?: TextFieldProps["placeholder"];
  height?: CSSProperties["height"];
  minWidth?: CSSProperties["minWidth"];
  disableClearable?: boolean;
  willLoadMoreResults?: boolean;
  onLoadMore?: () => void;
  loading?: boolean;
  error?: string;
  query?: string;
  onChangeQuery?: (value: string) => void;
}

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;

export function AutocompleteSelect<T extends Value>({
  id,
  multiple,
  values,
  options,
  onChange,
  error,
  loading,
  minWidth,
  height,
  disableClearable,
  onChangeQuery,
  ...props
}: Props<T>) {
  const seletedOptions = options.filter((item) => values.includes(item.value));
  const ListBoxComponent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLElement>
  >((_props, ref) => (
    <ListBox
      ref={ref}
      total={props.willLoadMoreResults ? options.length + 1 : options.length}
      loading={loading}
      willLoadMoreResults={props.willLoadMoreResults}
      onLoadMore={props.onLoadMore}
      {..._props}
    >
      {options.map((item, index) => (
        <ListBox.Row key={index}>{item.label}</ListBox.Row>
      ))}
    </ListBox>
  ));
  ListBoxComponent.displayName = "ListBoxComponent";

  return (
    <Autocomplete
      id={id}
      value={seletedOptions.length > 0 ? seletedOptions : undefined}
      multiple={multiple}
      options={options}
      getOptionKey={(option) => option.value}
      getOptionLabel={(option) => option.label}
      getOptionDisabled={(option) => option.disabled || false}
      // ListboxComponent={ListBoxComponent}
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
      disableClearable={disableClearable}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField
          {...params}
          {...props}
          value={props.query}
          error={!!error}
          helperText={error ? error : undefined}
          label={props.label}
          onChange={(e) => onChangeQuery?.(e.target.value)}
          InputLabelProps={{ sx: { top: "-6px" }, ...params.InputLabelProps }}
          InputProps={{
            sx: {
              height: height || "41px",
              minWidth: minWidth,
              "> input": {
                padding: "0 16px !important",
                height: "100% !important",
              },
            },
            ...params.InputProps,
          }}
        />
      )}
    />
  );
}
