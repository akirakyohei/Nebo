import { AutocompleteSelect } from "../../../components/AutocompleteSelect";

interface Props {
  values: number[];
  onChange: (_value: number[]) => void;
}

export const CategoryTemplateSelect = ({ values, onChange }: Props) => {
  
    return (
    <AutocompleteSelect values={values} options={[]} onChange={onChange} />
  );
};
