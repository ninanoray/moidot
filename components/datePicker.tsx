"use client";

import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import CalendarWithTime from "./calendarWIthTime";
import { getDateString, getDateTimeString } from "./datePicker/utile";

interface Props {
  time?: boolean;
}

export default function DatePicker({ time = false }: Props) {
  const defaultTimeString = new Date().toLocaleTimeString("sv-SE", {
    hour: "numeric",
    minute: "numeric",
  });

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [dateTime, setDateTime] = useState<string | undefined>(
    defaultTimeString
  );

  const updateDate = useCallback(() => {
    if (time && date)
      setDate(new Date(`${getDateString(date)} ${dateTime}:00`));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateTime, time]);

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
            "w-fit justify-between border-input font-normal cursor-auto",
            date || "text-muted-foreground"
          )}
        >
          {date
            ? time
              ? getDateTimeString(date)
              : getDateString(date)
            : "날짜를 선택해주세요"}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <CalendarWithTime
          mode="single"
          captionLayout="dropdown"
          selected={date}
          onSelect={(date) => {
            setDate(date);
            if (!time) setOpen(false);
          }}
          timeString={time && { from: dateTime }}
          onTimeStringChange={(range) => setDateTime(range.from)}
        />
      </PopoverContent>
    </Popover>
  );
}
