"use client";

import { ChevronDownIcon } from "lucide-react";
import { type DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import CalendarWithTime, { DateRangeString } from "./calendarWIthTime";
import { getDateString, getDateTimeString } from "./util";

interface DateRangePickerProps {
  value: DateRange | undefined;
  onChange: (...event: any[]) => void;
  useTime?: boolean;
}

export default function DateRangePicker({
  value,
  onChange,
  useTime = false,
}: DateRangePickerProps) {
  const defaultTimeString = new Date().toLocaleTimeString("sv-SE", {
    hour: "numeric",
    minute: "numeric",
  });

  const [rangeTime, setRangeTime] = useState<DateRangeString>({
    from: defaultTimeString,
    to: defaultTimeString,
  });

  const updateRange = useCallback(() => {
    if (useTime && value) {
      const from = `${getDateString(value.from)} ${rangeTime.from}:00`;
      const to = `${getDateString(value.to)} ${rangeTime.to}:00`;
      onChange({
        from: new Date(from),
        to: new Date(to),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rangeTime, useTime]);

  useEffect(() => {
    updateRange();
  }, [updateRange]);

  // 표시값
  function getTextValue(range: DateRange | undefined) {
    if (range) {
      const from = useTime
        ? getDateTimeString(range.from)
        : getDateString(range.from);
      const to = useTime
        ? getDateTimeString(range.to)
        : getDateString(range.to);
      if (from === to) return from;
      else return from + " ~ " + to;
    } else return "기간을 선택해주세요";
  }

  return (
    <Popover>
      <PopoverTrigger
        asChild
        className="[&_svg:not([class*='text-'])]:text-muted-foreground/50"
      >
        <Button
          variant="outline"
          id="dates"
          className={cn(
            "w-fit justify-between border-input font-normal cursor-auto",
            value || "text-muted-foreground"
          )}
        >
          {getTextValue(value)}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <CalendarWithTime
          mode="range"
          captionLayout="dropdown"
          selected={value}
          onSelect={onChange}
          timeString={useTime && rangeTime}
          onTimeStringChange={setRangeTime}
        />
      </PopoverContent>
    </Popover>
  );
}
