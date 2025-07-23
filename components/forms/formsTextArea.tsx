import { cn } from "@/lib/utils";
import { FormsItem, FormsItemsProps } from ".";
import TextEditor from "../textEditor";
import { FormControl } from "../ui/form";

const FormsTextArea = ({
  label,
  placeholder = `${label} 정보를 입력해주세요`,
  className,
  ...props
}: FormsItemsProps) => {
  return (
    <FormsItem
      label={label}
      render={(field) => (
        <FormControl>
          <TextEditor
            content={field.value}
            onChange={field.onChange}
            placeholder={placeholder}
          />
        </FormControl>
      )}
      className={cn("min-h-40 sm:min-h-32", className)}
      {...props}
    />
  );
};

export default FormsTextArea;
