import { AutocompleteSelect } from "../../../components/AutocompleteSelect";
import { Option } from "../../../components/types";
import { useGetAllPaperTypesQuery } from "../../../data/paper_type.api";
import { PaperType } from "../../../types";
interface Props {
  value: string;
  onChange: (_value?: string) => void;
}

const unitPaperTypes = ["px", "mm", "cm"];

export const PaperTypeUnitSelect = ({ value, onChange }: Props) => {
  const options: Option<string>[] = unitPaperTypes.map((item) => ({
    value: item,
    label: `${item}`,
  }));

  return (
    <AutocompleteSelect
      disableClearable
      values={[value]}
      options={options}
      onChange={(_values) => {
        onChange(_values[0]);
      }}
    />
  );
};
