import { HTMLInputTypeAttribute } from "react";
import { FormsItem, formsItemProps } from ".";
import { FormControl } from "../ui/form";
import { Input } from "../ui/input";

const FormsInput = ({
  label,
  type,
  placeholder = `${label}를 입력해주세요`,
  ...props
}: formsItemProps & { type?: HTMLInputTypeAttribute }) => {
  return (
    <FormsItem
      name={props.name}
      label={label}
      description={props.description}
      fullHeight={props.fullHeight}
      className={props.className}
      render={(field) => (
        <FormControl>
          <Input
            {...field}
            type={type}
            value={props.value}
            defaultValue={props.defaultValue}
            placeholder={placeholder}
            disabled={props.disabled}
            autoFocus={props.autoFocus}
            tabIndex={props.tabIndex}
          />
        </FormControl>
      )}
    />
  );
};

export default FormsInput;
