import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { forwardRef, useState } from "react";
import { Button, buttonVariants } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { FormControl } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { TimePicker } from "./timePicker";

interface DatePickerProps extends DatePickerStyleProps {
  value: Date | undefined;
  onChange: (...event: any[]) => void;
  useTime?: boolean;
}

interface DatePickerStyleProps {
  tabIndex?: number | undefined;
  autoFocus?: boolean | undefined;
  align?: "start" | "center" | "end" | undefined;
  className?: string;
}

const DatePicker = ({
  value,
  onChange,
  align,
  useTime = false,
  tabIndex,
  autoFocus,
  className,
}: DatePickerProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild onChange={(e) => e.currentTarget.blur()}>
        <FormControl>
          <DatePickerTrigger
            tabIndex={tabIndex}
            autoFocus={autoFocus}
            className={className}
          >
            {value &&
              `${value?.toLocaleDateString("en-CA")} ${
                useTime ? format(value, "HH:mm") : ""
              }`}
          </DatePickerTrigger>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align={align}>
        <Calendar
          mode="single"
          // captionLayout="dropdown-buttons"
          selected={value}
          onSelect={(e) => {
            onChange(e);
            if (!useTime) setOpen(false);
          }}
          fromYear={1950}
          toYear={new Date().getFullYear()}
          showOutsideDays={false}
          showWeekNumber
          disabled={(date) =>
            date > new Date() || date < new Date("1950-01-01")
          }
        />
        {useTime && (
          <DatePickerFooter
            value={value}
            onChange={onChange}
            setOpen={setOpen}
          />
        )}
      </PopoverContent>
    </Popover>
  );
};

const DatePickerTrigger = forwardRef<
  React.ComponentRef<"button">,
  DatePickerStyleProps &
    React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & { placeholder?: string }
>(
  (
    { className, placeholder = "날짜를 선택해주세요", children, ...props },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        variant="outline"
        className={cn(
          "w-full font-normal group",
          "ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          "focus:bg-accent data-[state='open']:bg-accent sm:hover:bg-accent",
          "focus:text-accent-foreground data-[state='open']:text-accent-foreground sm:hover:text-accent-foreground",
          "active:brightness-75",
          className
        )}
        {...props}
      >
        {children || (
          <h5
            className={cn(
              "font-normal text-muted-foreground/70",
              "group-focus:text-accent-foreground group-data-[state='open']:text-accent-foreground sm:group-hover:text-accent-foreground"
            )}
          >
            {placeholder}
          </h5>
        )}
        <CalendarIcon className="size-4 ml-auto" />
      </Button>
    );
  }
);
DatePickerTrigger.displayName = "DatePickerTrigger";

const DatePickerFooter = ({
  setOpen,
  ...props
}: DatePickerProps & { setOpen: (open: boolean) => void }) => {
  const hasValue = props.value;
  const noValue = !props.value;

  return (
    <div className="p-1 flex gap-2 justify-end">
      <TimePicker
        date={props.value}
        setDate={props.onChange}
        className="w-full"
      />
      <Button
        variant="secondary"
        className="shrink-0"
        onClick={() => {
          if (hasValue || noValue) setOpen(false);
        }}
      >
        닫기
      </Button>
    </div>
  );
};

export { DatePicker, DatePickerTrigger };
export type { DatePickerStyleProps };
