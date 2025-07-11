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
              "bg-background transition-all hover:brightness-90 hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:brightness-50",
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
