import { FormsItem, FormsItemsProps } from ".";
import MonthPicker from "../datePicker/monthPicker";

const FormsMonthPicker = ({
  useTime,
  ...props
}: FormsItemsProps & { useTime?: boolean }) => {
  return (
    <FormsItem
      render={(field) => (
        <MonthPicker
          align="end"
          value={field.value}
          onChange={field.onChange}
          className="w-full pl-3"
        />
      )}
      {...props}
    />
  );
};

export default FormsMonthPicker;
