import { cn } from "@/lib/utils";
import { FormsItem, FormsItemsProps } from ".";
import { FormControl } from "../ui/form";
import { Input } from "../ui/input";

const FormsFileInput = ({ className, ...props }: FormsItemsProps) => {
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
            className={cn(
              "text-sm",
              !field.value && "text-muted-foreground",
              className
            )}
          />
        </FormControl>
      )}
      {...props}
    />
  );
};

export default FormsFileInput;
