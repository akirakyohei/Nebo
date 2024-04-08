import { AutocompleteSelect } from "../../../components/AutocompleteSelect";

interface Props {
  label?: string;
  values: number[];
  onChange: (_value: number[]) => void;
}

export const CategoryTemplateSelect = ({ label, values, onChange }: Props) => {
  return (
    <AutocompleteSelect
      values={values}
      label={label}
      options={[]}
      multiple
      onChange={onChange}
    />
  );
};
