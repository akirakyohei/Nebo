import { addYears, format, isAfter, isBefore } from "date-fns";
import {
  addDays,
  endOfDay,
  startOfDay,
  startOfMonth,
  endOfMonth,
  addMonths,
  startOfWeek,
  endOfWeek,
  isSameDay,
} from "date-fns";
import { createStaticRanges, StaticRange } from "react-date-range";
import { DateRange } from "./types";

const defineds = {
  startOfWeek: startOfWeek(new Date()),
  endOfWeek: endOfWeek(new Date()),
  startOfLastWeek: startOfWeek(addDays(new Date(), -7)),
  endOfLastWeek: endOfWeek(addDays(new Date(), -7)),
  startOfToday: startOfDay(new Date()),
  endOfToday: endOfDay(new Date()),
  startOfYesterday: startOfDay(addDays(new Date(), -1)),
  endOfYesterday: endOfDay(addDays(new Date(), -1)),
  startOfMonth: startOfMonth(new Date()),
  endOfMonth: endOfMonth(new Date()),
  startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
  endOfLastMonth: endOfMonth(addMonths(new Date(), -1)),
};

export const staticRanges: StaticRange[] = createStaticRanges([
  {
    label: "Hôm nay",
    range: () => ({
      startDate: defineds.startOfToday,
      endDate: defineds.endOfToday,
      selection: "today",
      unit: "hour",
    }),
  },
  {
    label: "Hôm qua",
    range: () => ({
      startDate: defineds.startOfYesterday,
      endDate: defineds.endOfYesterday,
      selection: "yesterday",
      unit: "hour",
    }),
  },

  {
    label: "Tuần này",
    range: () => ({
      startDate: defineds.startOfWeek,
      endDate: defineds.endOfWeek,
      selection: "this_week",
      unit: "day",
    }),
  },
  {
    label: "Tuần trước",
    range: () => ({
      startDate: defineds.startOfLastWeek,
      endDate: defineds.endOfLastWeek,
      selection: "last_week",
      unit: "day",
    }),
  },
  {
    label: "Tháng này",
    range: () => ({
      startDate: defineds.startOfMonth,
      endDate: defineds.endOfMonth,
      selection: "this_month",
      unit: "day",
    }),
  },
  {
    label: "Tháng trước",
    range: () => ({
      startDate: defineds.startOfLastMonth,
      endDate: defineds.endOfLastMonth,
      selection: "last_month",
      unit: "day",
    }),
  },
]);

export const transformDateRange = (
  startDate: Date,
  endDate: Date
): DateRange => {
  if (
    isBefore(addYears(startDate, 3), endDate) ||
    isSameDay(addYears(endDate, 3), endDate)
  )
    return {
      startDate: startDate,
      endDate: endDate,
      unit: "year",
    };

  if (
    isBefore(addMonths(startDate, 3), endDate) ||
    isSameDay(addMonths(endDate, 3), endDate)
  )
    return {
      startDate: startDate,
      endDate: endDate,
      unit: "month",
    };

  if (
    isAfter(addDays(startDate, 2), endDate) ||
    isSameDay(addDays(endDate, 2), endDate)
  )
    return {
      startDate: startDate,
      endDate: endDate,
      unit: "hour",
    };

  return {
    startDate: startDate,
    endDate: endDate,
    unit: "day",
  };
};

export const getDateRangeName = (startDate: Date, endDate: Date): string => {
  const range = staticRanges.find((a) => a.isSelected({ startDate, endDate }));
  if (range)
    return `${range.label}(${range.label === "Hôm nay" || range.label === "Hôm qua" ? format(startDate, "dd/MM/yyyy") : `${format(startDate, "dd/MM/yyyy")} - ${format(startDate, "dd/MM/yyyy")}`})`;
  if (isSameDay(startOfDay(startDate), startOfDay(endDate)))
    return `Ngày ${format(startDate, "dd/MM/yyyy")}`;

  return `${format(startDate, "dd/MM/yyyy")} - ${format(endDate, "dd/MM/yyyy")}`;
};

export const getFormatPatternsByUnit = (unit: DateRange["unit"]): string => {
  if (unit === "hour") return "HH:mm dd/MM/yyyy";
  if (unit === "day") return "dd/MM/yyyy";
  if (unit === "month") return "MM/yyyy";
  if (unit === "year") return "yyyy";
  return "HH:mm dd/MM/yyyy";
};
