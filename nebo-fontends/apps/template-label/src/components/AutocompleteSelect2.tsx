import {
  Autocomplete,
  AutocompleteOwnerState,
  AutocompleteRenderOptionState,
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
import React, {
  CSSProperties,
  FocusEventHandler,
  ReactNode,
  useMemo,
} from "react";
import { ListboxComponent } from "./ListBox";

type Value = number | string;
interface Props<T extends Value> {
  id?: string;
  value?: T;
  values?: Option<T>[];
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
  renderOption?: (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: Option<T>
  ) => React.ReactNode;
  noOptionText?: ReactNode;
  onBlur?: (event: React.FocusEvent<HTMLDivElement, Element>) => void;
}

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;

export default function AutocompleteSelect<T extends Value>({
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
  onLoadMore,
  willLoadMoreResults,
  noOptionText,
  renderOption,
  onBlur,
  ...props
}: Props<T>) {
  const isSelected = (value: T) => {
    return (values || []).findIndex((item) => item.value === value) > -1;
  };

  if (multiple) {
    return (
      <Autocomplete
        id={id}
        multiple
        autoSelect
        value={values && values?.length > 0 ? values : []}
        options={options}
        itemType=""
        onBlur={onBlur}
        isOptionEqualToValue={(option, value) => {
          return option.value === value.value;
        }}
        getOptionKey={(option) => option.value}
        getOptionLabel={(option) => option.label}
        getOptionDisabled={(option) => option.disabled || false}
        ListboxComponent={(props) => (
          <ListboxComponent {...props} onLoadMore={() => {}} />
        )}
        onChange={(_event, _value) => {
          if (_event.type === "click")
            onChange(isArray(_value) ? _value.map((item) => item.value) : []);
        }}
        renderTags={(value, getTagProps) => {
          return `Đã chọn ${value.length}`;
        }}
        filterOptions={(preOptions, state) => {
          onChangeQuery?.(state.inputValue);
          return preOptions;
        }}
        renderOption={(props, option) =>
          renderOption ? (
            renderOption(props, option)
          ) : (
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
                checked={isSelected(option.value)}
              />
              <Tooltip title={option.label} placement="right">
                <Typography>{option.label}</Typography>
              </Tooltip>
            </Box>
          )
        }
        disableCloseOnSelect
        noOptionsText={noOptionText}
        disableClearable={disableClearable}
        renderInput={(params) => (
          <TextField
            {...params}
            {...props}
            value={props.query}
            onBlur={(e) => {
              debugger;
            }}
            error={!!error}
            helperText={error ? error : undefined}
            label={props.label}
            // onChange={(e) => onChangeQuery?.(e.target.value)}
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
        value={values && values.length > 0 ? values[0] : null}
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
        renderOption={(props, option) => (
          <div
            key={option.value}
            {...(props as any)}
            style={{
              background: isSelected(option.value) ? "#accbad" : undefined,
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
        noOptionsText={noOptionText}
        onBlur={onBlur}
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
