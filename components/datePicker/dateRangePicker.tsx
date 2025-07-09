import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { FormControl } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { DatePickerStyleProps, DatePickerTrigger } from "./datePicker";
import RangeTimePicker from "./timePicker/rangeTimePicker";

type DateRangePickerProps = {
  value: DateRange | undefined;
  onChange: (...event: any[]) => void;
  resetValue: () => void;
  useTime?: boolean;
} & DatePickerStyleProps;

const DateRangePicker = ({
  value,
  onChange,
  resetValue,
  align,
  useTime = false,
  tabIndex,
  autoFocus,
  className,
}: DateRangePickerProps) => {
  const isMobile = useIsMobile();

  const [open, setOpen] = useState(false);

  return (
    <Popover
      open={open}
      onOpenChange={(open) => {
        if ((value?.from === undefined && value?.to === undefined) || value?.to)
          setOpen(open);
        else setOpen(true);
      }}
    >
      <PopoverTrigger asChild onChange={(e) => e.currentTarget.blur()}>
        <FormControl>
          <DatePickerTrigger
            tabIndex={tabIndex}
            autoFocus={autoFocus}
            placeholder={
              value?.from ? "종료일을 선택해주세요" : "기간을 선택해주세요"
            }
            className={className}
          >
            {value?.from &&
              value.to &&
              (isMobile
                ? `${format(value.from, "yy-MM-dd")} ~ ${format(
                    value.to,
                    "yy-MM-dd"
                  )}`
                : `${format(value.from, "yyyy-MM-dd")} ~ ${format(
                    value.to,
                    "yyyy-MM-dd"
                  )}`)}
          </DatePickerTrigger>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align={align}>
        <Calendar
          mode="range"
          defaultMonth={value?.from}
          // captionLayout="dropdown-buttons"
          selected={value}
          onSelect={onChange}
          fromYear={1950}
          toYear={new Date().getFullYear()}
          showOutsideDays={false}
          showWeekNumber
          disabled={(date) =>
            date > new Date() || date < new Date("1950-01-01")
          }
          className="w-fit"
        />
        <DateRangePickerFooter
          value={value}
          onChange={onChange}
          useTime={useTime}
          resetValue={resetValue}
          setOpen={setOpen}
        />
      </PopoverContent>
    </Popover>
  );
};
export default DateRangePicker;

const DateRangePickerFooter = ({
  setOpen,
  ...props
}: DateRangePickerProps & { setOpen: (open: boolean) => void }) => {
  const [playSpinAnimation, setPlaySpinAnimation] = useState(false);
  const hasValue = props.value?.from && props.value?.to;
  const noValue = !props.value?.from && !props.value?.to;

  return (
    <div className="p-1 flex gap-2 justify-end">
      {props.useTime && (
        <RangeTimePicker
          value={props.value}
          onChange={props.onChange}
          className="w-full"
        />
      )}
      <Button
        tabIndex={-1}
        size={"icon"}
        className="shrink-0"
        onClick={() => {
          props.resetValue();
          setPlaySpinAnimation(true);
        }}
      >
        <RefreshCcw
          className={cn(playSpinAnimation && "animate-spin repeat-1")}
          onAnimationEnd={() => setPlaySpinAnimation(false)}
        />
      </Button>
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
