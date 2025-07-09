import { cn } from "@/lib/utils";
import {
  add,
  eachMonthOfInterval,
  endOfYear,
  format,
  isEqual,
  parse,
  startOfMonth,
  startOfToday,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { FormControl } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { DatePickerTrigger } from "./datePicker";

function getStartOfCurrentMonth() {
  return startOfMonth(startOfToday());
}

interface MonthPickerProps {
  value: Date | undefined;
  onChange: (...event: any[]) => void;
  align?: "start" | "center" | "end" | undefined;
  placeholder?: string;
  className?: string;
}

export default function MonthPicker({
  value = new Date(),
  onChange,
  align,
  placeholder = "날짜를 선택해주세요",
  className,
}: MonthPickerProps) {
  const [open, setOpen] = useState(false);
  const [currentYear, setCurrentYear] = useState(format(value, "yyyy"));

  const firstDayCurrentYear = parse(currentYear, "yyyy", new Date());

  const months = eachMonthOfInterval({
    start: firstDayCurrentYear,
    end: endOfYear(firstDayCurrentYear),
  });

  function previousYear() {
    const firstDayNextYear = add(firstDayCurrentYear, { years: -1 });
    setCurrentYear(format(firstDayNextYear, "yyyy"));
  }

  function nextYear() {
    const firstDayNextYear = add(firstDayCurrentYear, { years: 1 });
    setCurrentYear(format(firstDayNextYear, "yyyy"));
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        onChange={(e) => e.currentTarget.blur()}
        className={className}
      >
        <FormControl>
          <DatePickerTrigger placeholder={placeholder}>
            {value && format(value, "yyyy년 MM월")}
          </DatePickerTrigger>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-full p-2" align={align}>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between bg-secondary rounded-md">
            <Button
              type="button"
              size="icon"
              variant="outline"
              onClick={previousYear}
              className="border-2 border-secondary"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <h5 className="text-secondary-foreground font-bold">
              {format(firstDayCurrentYear, "yyyy")}
            </h5>
            <Button
              type="button"
              size="icon"
              variant="outline"
              onClick={nextYear}
              className="border-2 border-secondary"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
          <div className="grid w-full grid-cols-3 gap-2">
            {months.map((month) => (
              <Button
                key={month.toString()}
                type="button"
                variant="ghost"
                className={cn(
                  "h-9 w-16 border-none aria-selected:bg-primary",
                  isEqual(month, value) && "bg-primary text-primary-foreground",
                  isEqual(month, getStartOfCurrentMonth()) && "font-black"
                )}
                onClick={() => {
                  onChange(month);
                  setOpen(false);
                }}
              >
                {format(month, "M") + "월"}
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
