import {
  Autocomplete,
  Box,
  Checkbox,
  TextField,
  TextFieldProps,
  Tooltip,
  Typography,
} from "@mui/material";
import { Option } from "./types";
import { isArray } from "lodash-es";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import ListBox from "./ListBox";
import React, { CSSProperties, useMemo } from "react";

type Value = number | string;
interface Props<T extends Value> {
  id?: string;
  value?: T;
  values?: T[];
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
  value,
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
  const seletedOptions: Option<T>[] = useMemo(
    () =>
      options.filter(
        (item) => values?.includes(item.value) || value === item.value
      ),
    [options, value, values]
  );

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

  if (multiple) {
    return (
      <Autocomplete
        id={id}
        multiple
        autoSelect
        value={seletedOptions.length > 0 ? seletedOptions : []}
        options={options}
        itemType=""
        isOptionEqualToValue={(option, value) => {
          debugger;
          return option.value === value.value;
        }}
        getOptionKey={(option) => option.value}
        getOptionLabel={(option) => option.label}
        getOptionDisabled={(option) => option.disabled || false}
        // ListboxComponent={ListBoxComponent}
        onChange={(_event, _value) => {
          debugger;
          values;
          seletedOptions;
          onChange(isArray(_value) ? _value.map((item) => item.value) : []);
        }}
        limitTags={4}
        renderOption={(props, option, { selected }) => (
          <Box
            component={"li"}
            key={option.value}
            {...props}
            sx={{ paddingLeft: "0 !important" }}
          >
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            <Tooltip title={option.label} placement="right">
              <Typography>{option.label}</Typography>
            </Tooltip>
          </Box>
        )}
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
                background: "#ffff",
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
  } else {
    return (
      <Autocomplete
        id={id}
        multiple={false}
        autoSelect
        value={seletedOptions.length > 0 ? seletedOptions[0] : null}
        options={options}
        getOptionKey={(option) => option.value}
        getOptionLabel={(option) => option.label}
        getOptionDisabled={(option) => option.disabled || false}
        // ListboxComponent={ListBoxComponent}
        onChange={(_event, _value) => {
          onChange(
            isArray(_value)
              ? _value.map((item) => item.value)
              : _value
                ? [_value?.value]
                : []
          );
        }}
        limitTags={4}
        renderOption={(props, option, { selected }) => (
          <div
            key={option.value}
            {...(props as any)}
            style={{
              background: selected ? "#accbad" : undefined,
              paddingLeft: "0 !important",
            }}
          >
            <Tooltip title={option.label} placement="right">
              <Typography>{option.label}</Typography>
            </Tooltip>
          </div>
        )}
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
}
