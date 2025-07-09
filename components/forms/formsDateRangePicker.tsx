import { FormsItem, FormsItemsProps, usePageForm } from ".";
import DateRangePicker from "../datePicker/dateRangePicker";

const FormsDateRangePicker = ({
  useTime,
  ...props
}: FormsItemsProps & { useTime?: boolean }) => {
  const context = usePageForm();
  if (context) {
    return (
      <FormsItem
        description={props.description}
        className={props.className}
        render={(field) => (
          <DateRangePicker
            align="start"
            value={field.value}
            onChange={field.onChange}
            useTime={useTime}
            resetValue={() => context.form.resetField(props.name)}
            className="w-full pl-3"
          />
        )}
        {...props}
      />
    );
  } else return <></>;
};

export default FormsDateRangePicker;
