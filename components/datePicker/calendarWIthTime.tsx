"use client";

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ko } from "date-fns/locale";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { ChangeEvent, ComponentProps } from "react";
import { ChevronProps, DayPicker, DropdownProps } from "react-day-picker";
import Ripple from "../animate-ui/effects/motion-ripple";
import { ScrollArea } from "../ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export interface DateRangeString {
  from: string | undefined;
  to?: string | undefined;
}

interface CalendarWithTimeProps {
  minYearFromNow?: number;
  maxYearFromNow?: number;
  timeString?: DateRangeString;
  onTimeStringChange?: (value: DateRangeString) => void;
}

export default function CalendarWithTime({
  minYearFromNow,
  maxYearFromNow = 5,
  timeString,
  onTimeStringChange,
  className,
  ...props
}: ComponentProps<typeof DayPicker> & CalendarWithTimeProps) {
  const startDate = new Date();
  const endDate = new Date();
  if (minYearFromNow)
    startDate.setFullYear(startDate.getFullYear() - minYearFromNow);
  endDate.setFullYear(endDate.getFullYear() + maxYearFromNow);

  return (
    <Card className="w-fit py-4 gap-3 border-0 rounded-lg">
      <CardContent className="px-4 grid justify-center">
        <Calendar
          locale={ko}
          startMonth={minYearFromNow ? startDate : undefined}
          endMonth={endDate}
          components={{
            Dropdown: CalendarDropDown,
            Chevron: CalendarChevron,
          }}
          classNames={{
            month: "flex flex-col w-full md:gap-4 gap-2",
            week: "flex w-full md:mt-1.5 mt-0.5 [&>*:not([data-outside='true'])]:first:text-destructive [&_*]:trans-200",
            dropdowns: "w-full flex-center flex-row-reverse z-1",
            today: "bg-secondary text-secondary-foreground rounded-full",
            range_start: "rounded-none rounded-l-md bg-accent overflow-hidden",
            range_end: "rounded-none rounded-r-md bg-accent overflow-hidden",
            day: "data-[selected='true']:[&>button]:rounded-none data-[selected='true']:[&>button]:data-[selected-single='true']:rounded-md",
          }}
          className={cn("p-0", className)}
          {...props}
        />
      </CardContent>
      {timeString && onTimeStringChange && (
        <CardFooter className="flex gap-2 border-t px-4 !pt-3 *:[div]:w-full">
          <TimeInput
            mode={props.mode}
            timeString={timeString}
            updateTimeString={onTimeStringChange}
          />
        </CardFooter>
      )}
    </Card>
  );
}

const CalendarDropDown = ({ value, onChange, options }: DropdownProps) => {
  const selected = options?.find((option) => option.value === value);
  const handleChange = (value: string) => {
    const changeEvent = {
      target: { value },
    } as ChangeEvent<HTMLSelectElement>;
    onChange?.(changeEvent);
  };
  return (
    <Select value={value?.toString()} onValueChange={handleChange}>
      <SelectTrigger className="bg-accent dark:bg-accent/80 border-0 rounded-full transition-all hover:brightness-90 first-of-type:rounded-l-none last-of-type:rounded-r-none">
        <SelectValue>{selected?.label}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <ScrollArea className="max-h-52">
          {options?.map((option, index) => (
            <SelectItem key={index} value={option.value.toString() ?? ""}>
              {option.label}
            </SelectItem>
          ))}
        </ScrollArea>
      </SelectContent>
    </Select>
  );
};

const CalendarChevron = ({
  className,
  orientation,
  ...props
}: ChevronProps) => {
  if (orientation === "left") {
    return (
      <Ripple>
        <ChevronLeftIcon className="size-4" {...props} />
      </Ripple>
    );
  }
  if (orientation === "right") {
    return (
      <Ripple>
        <ChevronRightIcon className="size-4" {...props} />
      </Ripple>
    );
  }
  return (
    <Ripple>
      <ChevronDownIcon className="size-4" {...props} />
    </Ripple>
  );
};

interface TimeInputProps {
  mode: "multiple" | "range" | "single" | undefined;
  timeString: DateRangeString;
  updateTimeString: (value: DateRangeString) => void;
}

const TimeInput = ({ mode, timeString, updateTimeString }: TimeInputProps) => {
  if (mode === "single")
    return (
      <>
        <Label htmlFor="time-from" className="mr-2 whitespace-nowrap">
          시간
        </Label>
        <Input
          id="time-from"
          type="time"
          defaultValue={timeString.from}
          onChange={(event) =>
            updateTimeString({
              ...timeString,
              from: event.target.value,
            })
          }
          className="text-sm border-0 bg-accent dark:bg-accent/80 appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </>
    );
  else if (mode === "range")
    return (
      <>
        <div>
          <Label htmlFor="time-from" className="mb-1 text-xs whitespace-nowrap">
            시작일
          </Label>
          <Input
            id="time-from"
            type="time"
            defaultValue={timeString.from}
            onChange={(event) =>
              updateTimeString({
                ...timeString,
                from: event.target.value,
              })
            }
            className="text-sm border-0 bg-accent dark:bg-accent/80 appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none rounded-r-none"
          />
        </div>
        <div>
          <Label htmlFor="time-to" className="mb-1 text-xs whitespace-nowrap">
            종료일
          </Label>
          <Input
            id="time-to"
            type="time"
            defaultValue={timeString.to}
            onChange={(event) =>
              updateTimeString({
                ...timeString,
                to: event.target.value,
              })
            }
            className="text-sm border-0 bg-accent dark:bg-accent/80 appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none rounded-l-none"
          />
        </div>
      </>
    );
};
