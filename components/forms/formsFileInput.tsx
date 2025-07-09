import { FormsItem, formsItemProps } from ".";
import { FormControl } from "../ui/form";
import { Input } from "../ui/input";

const FormsFileInput = ({
  name,
  label,
  description,
  fullHeight = false,
}: formsItemProps) => {
  return (
    <FormsItem
      name={name}
      label={label}
      description={description}
      fullHeight={fullHeight}
      render={(field) => (
        <FormControl>
          <Input
            type="file"
            multiple
            onChange={(e) =>
              field.onChange([...Array.from(e.target.files ?? [])])
            }
          />
        </FormControl>
      )}
    />
  );
};

export default FormsFileInput;
