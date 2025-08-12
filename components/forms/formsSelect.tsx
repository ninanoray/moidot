import { cn } from "@/lib/utils";
import * as SelectPrimitive from "@radix-ui/react-select";
import { FormsItem, FormsItemsProps } from ".";
import { buttonVariants } from "../ui/button";
import { FormControl } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export interface Selection {
  value: any;
  label: string;
}

interface FormsSelectProps extends FormsItemsProps {
  items: Selection[];
}

const FormsSelect = ({
  items,
  label,
  placeholder = label ? label + " 정보를 선택해주세요" : "선택해주세요",
  onValueChange,
  children,
  ...props
}: FormsSelectProps & React.ComponentProps<typeof SelectPrimitive.Root>) => {
  return (
    <FormsItem
      label={label}
      render={(field) => {
        const values = items.map((item) => item.value);
        const value = values.includes(field.value) ? field.value : "";
        return (
          <Select
            onValueChange={(value) => {
              field.onChange(value);
              if (onValueChange) onValueChange(value);
            }}
            value={value}
          >
            <FormControl>
              <SelectTrigger
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    className: "w-full justify-between font-normal cursor-auto",
                  }),
                  !field.value && "text-muted-foreground"
                )}
              >
                <SelectValue placeholder={placeholder}>
                  <span className="truncate">
                    {items.find((item) => item.value === field.value)?.label}
                  </span>
                </SelectValue>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {items.map((item, index) => (
                <SelectItem key={index + item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
              {children}
            </SelectContent>
          </Select>
        );
      }}
      {...props}
    />
  );
};

export default FormsSelect;
