import { FormsItem, formsItemProps } from ".";
import { DatePicker } from "../datePicker/datePicker";

const FormsDatePicker = ({
  useTime,
  ...props
}: formsItemProps & { useTime?: boolean }) => {
  return (
    <FormsItem
      name={props.name}
      label={props.label}
      description={props.description}
      fullHeight={props.fullHeight}
      render={(field) => (
        <DatePicker
          align="end"
          autoFocus={props.autoFocus}
          tabIndex={props.tabIndex}
          value={field.value}
          onChange={field.onChange}
          useTime={useTime}
          className="w-full pl-3"
        />
      )}
    />
  );
};

export default FormsDatePicker;
