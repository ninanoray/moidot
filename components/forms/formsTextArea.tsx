import { FormsItem, FormsItemsProps } from ".";
import TextEditor from "../textEditor";
import { FormControl } from "../ui/form";

const FormsTextArea = ({
  label,
  placeholder = `${label}을 입력해주세요.`,
  ...props
}: FormsItemsProps) => {
  return (
    <FormsItem
      name={props.name}
      label={label}
      description={props.description}
      render={(field) => (
        <FormControl>
          <TextEditor
            content={field.value}
            onChange={field.onChange}
            placeholder={placeholder}
          />
        </FormControl>
      )}
    />
  );
};

export default FormsTextArea;
