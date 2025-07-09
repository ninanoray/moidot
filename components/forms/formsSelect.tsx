import { cn } from "@/lib/utils";
import { FormsItem, formsItemProps } from ".";
import { FormControl } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export type FormsSelection = {
  value: any;
  label: string;
};

const FormsSelect = ({
  name,
  label,
  items,
  placeholder = `${label}을 선택해주세요`,
  description,
  fullHeight = false,
  hideLabel,
  tabIndex,
  unselectable = false,
  className,
  onChangeValue = () => {},
}: formsItemProps & {
  items: FormsSelection[];
  unselectable?: boolean;
  onChangeValue?: (value: string) => void;
}) => {
  return (
    <FormsItem
      name={name}
      label={label}
      hideLabel={hideLabel}
      description={description}
      fullHeight={fullHeight}
      className={className}
      render={(field) => (
        <Select
          onValueChange={(value) => {
            field.onChange(value);
            onChangeValue(value);
          }}
          value={field.value}
        >
          <FormControl>
            <SelectTrigger
              tabIndex={tabIndex}
              className={cn("w-full", !field.value && "text-muted-foreground")}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {items.map((item, index) => {
              function unselect() {
                if (field.value === item.value) field.onChange("");
              }
              return (
                <SelectItem
                  key={index}
                  value={item.value}
                  onClick={() => {
                    if (unselectable) unselect();
                  }}
                >
                  {item.label}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      )}
    />
  );
};

export default FormsSelect;
