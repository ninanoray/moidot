import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { ControllerRenderProps, useForm, UseFormReturn } from "react-hook-form";
import { z, ZodType } from "zod";
import { Button } from "../ui/button";
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
  isSearchForm: boolean;
};

const FormsContext = React.createContext<FormsContext | null>(null);
const usePageForm = () => React.useContext(FormsContext);

interface FormsProps {
  schema: ZodType<any, any, any>;
  defaultValues?: any;
  submitText?: string;
  onSubmit?: (data: z.infer<any>) => void;
  isSearch?: boolean;
  children: React.ReactNode;
  className?: string | undefined;
}

const Forms = ({
  schema,
  defaultValues,
  isSearch = false,
  submitText = "저장",
  onSubmit = (data) => console.log(data),
  children,
  className,
}: FormsProps) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const formsContextValue = React.useMemo<FormsContext>(() => {
    return { form: form, isSearchForm: isSearch };
  }, [form, isSearch]);

  if (!isSearch)
    return (
      <FormsContext.Provider value={formsContextValue}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn("size-full -mt-1 flex flex-col gap-2", className)}
          >
            {children}
            <Button type="submit" className="w-full mt-3">
              {submitText}
            </Button>
          </form>
        </Form>
      </FormsContext.Provider>
    );
  else
    return (
      <FormsContext.Provider value={formsContextValue}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex gap-2 justify-between"
          >
            <div className="min-w-0 grow flex flex-col md:flex-row gap-2 md:gap-4 trans-200">
              {children}
            </div>
            <Button type="submit" className="w-20 self-end">
              조회
            </Button>
          </form>
        </Form>
      </FormsContext.Provider>
    );
};

interface FormsItemsProps {
  name: string;
  label: string;
  hideLabel?: boolean;
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
  hideLabel = false,
  className,
  render,
  ...props
}: FormsItemProps & Omit<React.ComponentProps<typeof FormField>, "render">) => {
  const context = usePageForm();

  if (context) {
    const form = context.form;
    const isSearchForm = context.isSearchForm;
    if (!isSearchForm) {
      return (
        <FormField
          control={form.control}
          render={({ field }) => (
            <FormItem
              className={cn("w-full flex flex-col relative", className)}
            >
              <div className="size-full flex flex-col gap-1">
                <FormLabel className={cn("text-sm", hideLabel && "hidden")}>
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
    } else {
      return (
        <FormField
          control={form.control}
          render={({ field }) => (
            <FormItem
              className={cn(
                "w-full relative flex gap-2 items-center trans-200",
                className
              )}
            >
              <FormLabel className="whitespace-nowrap text-sm sm:text-base">
                {label}
              </FormLabel>
              {render(field)}
              <FormMessage />
            </FormItem>
          )}
          {...props}
        />
      );
    }
  } else return <>{"please use in PageForm component!"}</>;
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
