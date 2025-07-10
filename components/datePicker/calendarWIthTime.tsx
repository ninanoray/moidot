"use client";

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ChangeEvent, ComponentProps } from "react";
import { DayPicker, DropdownProps } from "react-day-picker";
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
  timeString?: DateRangeString | false;
  onTimeStringChange?: (value: DateRangeString) => void;
}

export default function CalendarWithTime({
  timeString,
  onTimeStringChange,
  className,
  ...props
}: ComponentProps<typeof DayPicker> & CalendarWithTimeProps) {
  return (
    <Card className="w-fit py-4 gap-3">
      <CardContent className="px-4">
        <Calendar
          components={{
            Dropdown: ({ value, onChange, options }: DropdownProps) => {
              const selected = options?.find(
                (option) => option.value === value
              );
              const handleChange = (value: string) => {
                const changeEvent = {
                  target: { value },
                } as ChangeEvent<HTMLSelectElement>;
                onChange?.(changeEvent);
              };

              return (
                <Select value={value?.toString()} onValueChange={handleChange}>
                  <SelectTrigger className="border-0 rounded-md shadow-none">
                    <SelectValue>{selected?.value}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {/* <ScrollArea className="h-60"> */}
                    {options?.map((option, index) => (
                      <SelectItem
                        key={index}
                        value={option.value?.toString() ?? ""}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                    {/* </ScrollArea> */}
                  </SelectContent>
                </Select>
              );
            },
          }}
          classNames={{
            dropdowns: "w-full flex-center flex-row-reverse z-1",
          }}
          className={cn("p-0", className)}
          {...props}
        />
      </CardContent>
      {timeString && onTimeStringChange && (
        <CardFooter className="flex gap-2 border-t px-4 !pt-4 *:[div]:w-full">
          <Label
            htmlFor="time-from"
            className={cn(
              "mr-2 whitespace-nowrap",
              props.mode !== "single" && "sr-only"
            )}
          >
            시간
          </Label>
          <Input
            id="time-from"
            type="time"
            defaultValue={timeString.from}
            onChange={(event) =>
              onTimeStringChange({
                ...timeString,
                from: event.target.value,
              })
            }
            className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
          {props.mode === "range" && (
            <>
              <span>~</span>
              <Input
                id="time-to"
                type="time"
                defaultValue={timeString.to}
                onChange={(event) =>
                  onTimeStringChange({
                    ...timeString,
                    to: event.target.value,
                  })
                }
                className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
            </>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
