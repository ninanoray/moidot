import { FormsItem, formsItemProps, usePageForm } from ".";
import DateRangePicker from "../datePicker/dateRangePicker";

const FormsDateRangePicker = ({
  useTime,
  ...props
}: formsItemProps & { useTime?: boolean }) => {
  const context = usePageForm();
  if (context) {
    return (
      <FormsItem
        name={props.name}
        label={props.label}
        description={props.description}
        fullHeight={props.fullHeight}
        tabIndex={props.tabIndex}
        className={props.className}
        render={(field) => (
          <DateRangePicker
            align="start"
            autoFocus={props.autoFocus}
            value={field.value}
            onChange={field.onChange}
            useTime={useTime}
            resetValue={() => context.form.resetField(props.name)}
            className={"w-full pl-3"}
          />
        )}
      />
    );
  } else return <></>;
};

export default FormsDateRangePicker;
