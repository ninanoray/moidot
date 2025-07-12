import { FormsItem, FormsItemsProps } from ".";
import DateRangePicker from "../datePicker/dateRangePicker";
import { FormControl } from "../ui/form";

const FormsDateRangePicker = ({
  useTime,
  ...props
}: FormsItemsProps & { useTime?: boolean }) => {
  return (
    <FormsItem
      description={props.description}
      className={props.className}
      render={(field) => (
        <FormControl>
          <DateRangePicker
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

export default FormsDateRangePicker;
