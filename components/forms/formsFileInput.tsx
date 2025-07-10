import { FormsItem, FormsItemsProps } from ".";
import { FormControl } from "../ui/form";
import { Input } from "../ui/input";

const FormsFileInput = ({ name, label, description }: FormsItemsProps) => {
  return (
    <FormsItem
      name={name}
      label={label}
      description={description}
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
