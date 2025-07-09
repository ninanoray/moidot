"use client";

import { cn } from "@/lib/utils";
import * as React from "react";
import { TimePickerInput } from "./timePickerInput";

interface TimePickerProps {
  date: Date | undefined;
  className?: string;
  setDate: (date: Date | undefined) => void;
  onRightFocus?: () => void;
  onLeftFocus?: () => void;
}

export function TimePicker({
  date,
  className,
  setDate,
  onRightFocus,
  onLeftFocus,
}: TimePickerProps) {
  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className={cn("flex items-center justify-between gap-1", className)}>
      <div className="flex items-center gap-0.5 border-2 border-secondary rounded-md bg-background">
        <TimePickerInput
          picker="hours"
          date={date}
          setDate={setDate}
          ref={hourRef}
          onLeftFocus={onLeftFocus}
          onRightFocus={() => minuteRef.current?.focus()}
          className="border-none rounded"
        />
        :
        <TimePickerInput
          picker="minutes"
          date={date}
          setDate={setDate}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
          onRightFocus={onRightFocus}
          className="border-none rounded"
        />
      </div>
    </div>
  );
}
