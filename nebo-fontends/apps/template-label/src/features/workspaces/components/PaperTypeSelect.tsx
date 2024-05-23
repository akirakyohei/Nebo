import { AutocompleteSelect } from "../../../components/AutocompleteSelect";
import { Option } from "../../../components/types";
import { useGetAllPaperTypesQuery } from "../../../data/paper_type.api";
import { PaperType } from "../../../types";
interface Props {
  label?: string;
  value: number;
  onChange: (_value?: PaperType) => void;
  error?: string;
}

export const PaperTypeSelect = ({ label, value, onChange, error }: Props) => {
  const {
    data: paperTypes = [],
    isLoading: isLoadingCategories,
    isFetching: isFetchingCategories,
  } = useGetAllPaperTypesQuery();

  const options: Option[] = paperTypes.map((item) => ({
    value: item.id,
    label: `${item.name}`,
  }));

  return (
    <AutocompleteSelect
      values={[value]}
      label={label}
      options={options}
      loading={isFetchingCategories}
      onChange={(_values) => {
        onChange(paperTypes.find((a) => a.id === _values[0]));
      }}
      error={error}
    />
  );
};
