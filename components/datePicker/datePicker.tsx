"use client";

import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../animate-ui/radix/popover";
import CalendarWithTime from "./calendarWIthTime";
import { getDateString, getDateTimeString } from "./util";

interface DatePickerProps {
  value: Date | undefined;
  onChange: (...event: any[]) => void;
  useTime?: boolean;
  className?: string | undefined;
}

export default function DatePicker({
  value,
  onChange,
  useTime = false,
  className,
  ...props
}: DatePickerProps) {
  const defaultTimeString = new Date().toLocaleTimeString("sv-SE", {
    hour: "numeric",
    minute: "numeric",
  });

  const [open, setOpen] = useState(false);
  const [dateTime, setDateTime] = useState<string | undefined>(
    defaultTimeString
  );

  const updateDate = useCallback(() => {
    if (useTime && value)
      onChange(new Date(`${getDateString(value)} ${dateTime}:00`));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateTime, useTime]);

  useEffect(() => {
    updateDate();
  }, [updateDate]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        className="[&_svg:not([class*='text-'])]:text-muted-foreground/50"
      >
        <Button
          variant="outline"
          id="date"
          className={cn(
            "w-fit justify-between font-normal cursor-auto",
            value || "text-muted-foreground",
            className
          )}
          {...props}
        >
          {value
            ? useTime
              ? getDateTimeString(value)
              : getDateString(value)
            : "날짜를 선택해주세요"}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-auto p-0 rounded-lg">
        <CalendarWithTime
          mode="single"
          captionLayout="dropdown"
          selected={value}
          onSelect={(date) => {
            onChange(date);
            if (!useTime) setOpen(false);
          }}
          timeString={useTime && { from: dateTime }}
          onTimeStringChange={(range) => setDateTime(range.from)}
        />
      </PopoverContent>
    </Popover>
  );
}
