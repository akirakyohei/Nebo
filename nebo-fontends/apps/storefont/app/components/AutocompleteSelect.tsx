import { Autocomplete, TextField } from "@mui/material";
import { Option } from "./types";

type Value = number | string;
interface Props<Value> {
  values: Value[];
  options: Option<Value>[];
  multiple?: boolean;
}

export function AutocompleteSelect<Value>({
  multiple,
  values,
  options,
}: Props<Value>) {
  return (
    <Autocomplete
      values={values}
      multiple={multiple}
      id="tags-outlined"
      options={options}
      getOptionLabel={(option) => option}
      defaultValue={values}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField
          {...params}
          label="filterSelectedOptions"
          placeholder="Favorites"
        />
      )}
    />
  );
}
