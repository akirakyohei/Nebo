import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { TextField } from "../TextField";
import { useState } from "react";
import { Box, Popper } from "@mui/material";
import locale from "date-fns/locale/vi";
import {
  getDateRangeName,
  staticRanges,
  transformDateRange,
} from "./constants";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { DateRange } from "./types";
import { endOfDay, startOfDay } from "date-fns";
export type DateSelectProps = {
  startDate: Date;
  endDate: Date;
  label?: string;
  placeholder?: string;
  onChange: (value: DateRange) => void;
};

export const DateTimeSelect = ({
  startDate: startDate,
  endDate: endDate,
  label,
  placeholder,
  onChange,
}: DateSelectProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <TextField
        onClick={handleClick}
        label={label}
        value={getDateRangeName(startDate, endDate)}
        placeholder={placeholder}
        InputProps={{
          readOnly: true,
          endAdornment: open ? <ArrowDropUp /> : <ArrowDropDown />,
          sx: (theme) => ({
            height: "41px",
            background: theme.palette.background.paper,
          }),
        }}
      />
      <Popper
        id={"date-range-select"}
        sx={{ paddingTop: 0.5 }}
        open={open}
        anchorEl={anchorEl}
      >
        <Box sx={(theme) => ({ boxShadow: theme.shadows[1] })}>
          <DateRangePicker
            locale={locale}
            ranges={[
              {
                startDate: startDate,
                endDate: endDate,
              },
            ]}
            onChange={(value) => {
              onChange(
                transformDateRange(
                  value.range1.startDate || startOfDay(new Date()),
                  value.range1.endDate || endOfDay(new Date())
                )
              );
            }}
            staticRanges={staticRanges}
            inputRanges={[]}
          />
        </Box>
      </Popper>
    </>
  );
};
