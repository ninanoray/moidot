import { cn } from "@/lib/utils";
import * as SelectPrimitive from "@radix-ui/react-select";
import { FormsItem, FormsItemsProps } from ".";
import { FormControl } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export interface FormsSelection {
  value: any;
  label: string;
}

interface FormsSelectProps extends FormsItemsProps {
  items: FormsSelection[];
}

const FormsSelect = ({
  items,
  label,
  placeholder = label + " 정보를 입력해주세요",
  ...props
}: FormsSelectProps & React.ComponentProps<typeof SelectPrimitive.Root>) => {
  return (
    <FormsItem
      label={label}
      render={(field) => (
        <Select onValueChange={field.onChange} value={field.value}>
          <FormControl>
            <SelectTrigger
              className={cn("w-full", !field.value && "text-muted-foreground")}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {items.map((item, index) => (
              <SelectItem key={index} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      {...props}
    />
  );
};

export default FormsSelect;
