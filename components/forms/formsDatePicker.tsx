import { FormsItem, FormsItemsProps } from ".";
import DatePicker from "../datePicker/datePicker";

interface FormsDatePickerProps extends FormsItemsProps {
  useTime?: boolean;
}

const FormsDatePicker = ({ useTime, ...props }: FormsDatePickerProps) => {
  return (
    <FormsItem
      render={(field) => (
        <DatePicker
          value={field.value}
          onChange={field.onChange}
          useTime={useTime}
          className="w-full"
        />
      )}
      {...props}
    />
  );
};

export default FormsDatePicker;
