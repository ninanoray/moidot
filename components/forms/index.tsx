import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { ControllerRenderProps, useForm, UseFormReturn } from "react-hook-form";
import { z, ZodType } from "zod";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import FormsDatePicker from "./formsDatePicker";
import FormsFileInput from "./formsFileInput";
import FormsInput from "./formsInput";
import FormsSelect from "./formsSelect";
import FormsTextArea from "./formsTextArea";

type FormsContext = {
  form: UseFormReturn<any, any, undefined>;
};

const FormsContext = React.createContext<FormsContext | null>(null);
const usePageForm = () => React.useContext(FormsContext);

interface FormsProps {
  schema: ZodType<any, any, any>;
  defaultValues?: any;
  onSubmit?: (data: z.infer<any>) => void;
  children: React.ReactNode;
  className?: string | undefined;
}

const Forms = ({
  schema,
  defaultValues,
  onSubmit = (data) => console.log(data),
  children,
  className,
}: FormsProps) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const formsContextValue = React.useMemo<FormsContext>(() => {
    return { form: form };
  }, [form]);

  return (
    <FormsContext.Provider value={formsContextValue}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn(
            "size-full flex flex-col gap-2 [&_button[type='submit']]:w-24 [&_button[type='submit']]:mt-3 [&_button[type='submit']]:self-end",
            className
          )}
        >
          {children}
        </form>
      </Form>
    </FormsContext.Provider>
  );
};

interface FormsItemsProps {
  name: string;
  label: string;
  hidelabel?: boolean;
  placeholder?: string;
  description?: string;
  className?: string;
}

interface FormsItemProps extends FormsItemsProps {
  render: (field: ControllerRenderProps<any, string>) => React.JSX.Element;
}

const FormsItem = ({
  label,
  description,
  hidelabel = false,
  className,
  render,
  ...props
}: FormsItemProps & Omit<React.ComponentProps<typeof FormField>, "render">) => {
  const form = usePageForm()?.form;

  if (form) {
    return (
      <FormField
        control={form.control}
        render={({ field }) => (
          <FormItem className={cn("w-full flex flex-col relative", className)}>
            <div className="size-full flex flex-col gap-1">
              <FormLabel className={cn("text-sm", hidelabel && "hidden")}>
                {label}
              </FormLabel>
              <div className="size-full">
                {render(field)}
                {description && (
                  <FormDescription
                    className={cn(
                      "mx-1 text-xs break-keep",
                      form.formState.errors.files ? "hidden" : ""
                    )}
                  >
                    {description}
                  </FormDescription>
                )}
              </div>
            </div>
            <FormMessage className="absolute -bottom-4 right-0 text-xs break-keep" />
          </FormItem>
        )}
        {...props}
      />
    );
  } else return <>{"please use in Forms component!"}</>;
};

export {
  Forms,
  FormsDatePicker,
  FormsFileInput,
  FormsInput,
  FormsItem,
  FormsSelect,
  FormsTextArea,
  usePageForm,
};
export type { FormsItemsProps };
