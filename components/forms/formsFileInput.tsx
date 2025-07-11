import { FormsItem, FormsItemsProps } from ".";
import { FormControl } from "../ui/form";
import { Input } from "../ui/input";

const FormsFileInput = ({ ...props }: FormsItemsProps) => {
  return (
    <FormsItem
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
      {...props}
    />
  );
};

export default FormsFileInput;
