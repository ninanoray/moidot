import { cn } from "@/lib/utils";
import { ControllerRenderProps } from "react-hook-form";
import { FormsItem, FormsItemsProps } from ".";
import { buttonVariants } from "../ui/button";
import { FormControl } from "../ui/form";
import { Input } from "../ui/input";

const FormsInput = ({
  type,
  label,
  hidelabel,
  placeholder = label + " 정보를 입력해주세요",
  ...props
}: FormsItemsProps & React.ComponentProps<"input">) => {
  return (
    <FormsItem
      label={label}
      hidelabel={hidelabel}
      render={(field: ControllerRenderProps<any, string>) => (
        <FormControl>
          <Input
            {...field}
            type={type}
            placeholder={placeholder}
            value={field.value || ""}
            className={cn(
              buttonVariants({
                variant: "outline",
                className:
                  "w-full px-3 font-normal cursor-auto focus:brightness-100",
              }),
              !field.value && "text-muted-foreground"
            )}
            {...props}
          />
        </FormControl>
      )}
      {...props}
    />
  );
};

export default FormsInput;
