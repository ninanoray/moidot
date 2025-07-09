import { ControllerRenderProps } from "react-hook-form";
import { FormsItem, FormsItemsProps } from ".";
import { FormControl } from "../ui/form";
import { Input } from "../ui/input";

const FormsInput = ({
  type,
  label,
  placeholder = label + " 정보를 입력해주세요",
  ...props
}: FormsItemsProps & React.ComponentProps<"input">) => {
  return (
    <FormsItem
      label={label}
      render={(field: ControllerRenderProps<any, string>) => (
        <FormControl>
          <Input
            {...field}
            type={type}
            placeholder={placeholder}
            value={field.value || ""}
            {...props}
          />
        </FormControl>
      )}
      {...props}
    />
  );
};

export default FormsInput;
