import { FormsItem, FormsItemsProps } from ".";
import { DatePicker } from "../datePicker/datePicker";

interface FormsDatePickerProps extends FormsItemsProps {
  useTime?: boolean;
}

const FormsDatePicker = ({ useTime, ...props }: FormsDatePickerProps) => {
  return (
    <FormsItem
      render={(field) => (
        <DatePicker
          align="end"
          value={field.value}
          onChange={field.onChange}
          useTime={useTime}
          className="w-full pl-3"
        />
      )}
      {...props}
    />
  );
};

export default FormsDatePicker;
