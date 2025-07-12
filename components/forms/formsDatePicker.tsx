import { FormsItem, FormsItemsProps } from ".";
import DatePicker from "../datePicker/datePicker";
import { FormControl } from "../ui/form";

interface FormsDatePickerProps extends FormsItemsProps {
  useTime?: boolean;
}

const FormsDatePicker = ({ useTime, ...props }: FormsDatePickerProps) => {
  return (
    <FormsItem
      render={(field) => (
        <FormControl>
          <DatePicker
            value={field.value}
            onChange={field.onChange}
            useTime={useTime}
            className="w-full"
          />
        </FormControl>
      )}
      {...props}
    />
  );
};

export default FormsDatePicker;
