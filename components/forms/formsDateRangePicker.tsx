import { FormsItem, FormsItemsProps } from ".";
import DateRangePicker from "../datePicker/dateRangePicker";

const FormsDateRangePicker = ({
  useTime,
  ...props
}: FormsItemsProps & { useTime?: boolean }) => {
  return (
    <FormsItem
      description={props.description}
      className={props.className}
      render={(field) => (
        <DateRangePicker
          value={field.value}
          onChange={field.onChange}
          useTime={useTime}
        />
      )}
      {...props}
    />
  );
};

export default FormsDateRangePicker;
