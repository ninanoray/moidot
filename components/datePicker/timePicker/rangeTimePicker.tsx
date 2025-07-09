import { cn } from "@/lib/utils";
import { useRef } from "react";
import { DateRange } from "react-day-picker";
import { TimePickerInput } from "./timePickerInput";

type Props = {
  value: DateRange | undefined;
  onChange: (...event: any[]) => void;
  className?: string;
};

const RangeTimePicker = ({ value, onChange, className }: Props) => {
  const fromHourRef = useRef<HTMLInputElement>(null);
  const fromMinuteRef = useRef<HTMLInputElement>(null);
  // const toHourRef = useRef<HTMLInputElement>(null);
  // const toMinuteRef = useRef<HTMLInputElement>(null);

  return (
    <div className={cn("flex items-center justify-between gap-1", className)}>
      <div className="flex items-center gap-0.5 border-2 border-secondary rounded-md bg-background">
        <TimePickerInput
          picker="hours"
          date={value?.from}
          setDate={(date) => onChange({ ...value, from: date })}
          ref={fromHourRef}
          onRightFocus={() => fromMinuteRef.current?.focus()}
          className="border-none rounded"
        />
        :
        <TimePickerInput
          picker="minutes"
          date={value?.from}
          setDate={(date) => onChange({ ...value, from: date })}
          ref={fromMinuteRef}
          onLeftFocus={() => fromHourRef.current?.focus()}
          // onRightFocus={() => toHourRef.current?.focus()}
          className="border-none rounded"
        />
      </div>
      {/* ~
      <div className="flex items-center gap-0.5 border-2 border-secondary rounded-md bg-background">
        <TimePickerInput
          picker="hours"
          date={value?.to}
          setDate={(date) => onChange({ ...value, to: date })}
          ref={toHourRef}
          onLeftFocus={() => fromMinuteRef.current?.focus()}
          onRightFocus={() => toMinuteRef.current?.focus()}
          className="border-none rounded"
        />
        :
        <TimePickerInput
          picker="minutes"
          date={value?.to}
          setDate={(date) => onChange({ ...value, to: date })}
          ref={toMinuteRef}
          onLeftFocus={() => toHourRef.current?.focus()}
          className="border-none rounded"
        />
      </div> */}
    </div>
  );
};

export default RangeTimePicker;
