import { Tabs as MaterialTabs, Tab } from "@mui/material";
import { SyntheticEvent } from "react";

export type TabOption = {
  label: string;
  value: string;
};

interface Props {
  value: string;
  onChange: (_value: string, event?: SyntheticEvent<Element, Event>) => void;
  items: TabOption[];
}

export const Tabs = ({ value, onChange, items }: Props) => {
  return (
    <MaterialTabs
      value={value}
      onChange={(event: SyntheticEvent<Element, Event>, value: any) => {
        onChange(value, event);
      }}
      textColor="primary"
      indicatorColor="primary"
      variant="scrollable"
      scrollButtons="auto"
      aria-label="primary tabs"
    >
      {items.map((item) => (
        <Tab
          key={item.value}
          value={item.value}
          label={item.label}
          sx={{ padding: 1, textTransform: "initial" }}
        />
      ))}
    </MaterialTabs>
  );
};
