import { FormsItem, formsItemProps } from ".";
import TextEditor from "../textEditor";
import { FormControl } from "../ui/form";

const FormsTextArea = ({
  label,
  placeholder = `${label}을 입력해주세요.`,
  ...props
}: formsItemProps) => {
  return (
    <FormsItem
      name={props.name}
      label={label}
      description={props.description}
      fullHeight={props.fullHeight}
      render={(field) => (
        <FormControl>
          <TextEditor
            content={field.value}
            onChange={field.onChange}
            placeholder={placeholder}
            tabIndex={props.tabIndex}
          />
        </FormControl>
      )}
    />
  );
};

export default FormsTextArea;
