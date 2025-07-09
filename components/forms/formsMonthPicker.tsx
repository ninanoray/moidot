import { FormsItem, formsItemProps } from ".";
import MonthPicker from "../datePicker/monthPicker";

const FormsMonthPicker = ({
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
        <MonthPicker
          align="end"
          value={field.value}
          onChange={field.onChange}
          className="w-full pl-3"
        />
      )}
    />
  );
};

export default FormsMonthPicker;
