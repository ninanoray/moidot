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
import { DayPicker, DropdownProps } from "react-day-picker";
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
    <Card className="w-fit py-4 gap-3 border-0 rounded-lg">
      <CardContent className="px-4 grid justify-center">
        <Calendar
          locale={ko}
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
                  <SelectTrigger className="bg-accent dark:bg-accent/80 border-0 rounded-full transition-all hover:brightness-90 first-of-type:rounded-l-none last-of-type:rounded-r-none">
                    <SelectValue>{selected?.label}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <ScrollArea className="max-h-52">
                      {options?.map((option, index) => (
                        <SelectItem
                          key={index}
                          value={option.value.toString() ?? ""}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </ScrollArea>
                  </SelectContent>
                </Select>
              );
            },
            Chevron: ({ className, orientation, ...props }) => {
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
            },
          }}
          classNames={{
            dropdowns: "w-full flex-center flex-row-reverse z-1",
            today: "bg-secondary text-secondary-foreground rounded-full",
          }}
          className={cn("p-0", className)}
          {...props}
        />
      </CardContent>
      {timeString && onTimeStringChange && (
        <CardFooter className="flex gap-2 border-t px-4 !pt-3 *:[div]:w-full">
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
            className="text-sm border-0 bg-accent dark:bg-accent/80 appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
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
                className="text-sm border-0 bg-accent dark:bg-accent/80 appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
            </>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
