import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createContext,
  JSX,
  MouseEventHandler,
  ReactNode,
  useContext,
  useMemo,
} from "react";
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

const FormsContext = createContext<FormsContext | null>(null);
const usePageForm = () => useContext(FormsContext);

type FormsProps = {
  schema: ZodType<any, any, any>;
  defaultValues?: any;
  className?: string | undefined;
  children: ReactNode;
  onSubmit?: (data: z.infer<any>) => void;
  submitButtonLabel?: string;
  linkButtonLabel?: string;
  onClickLinkBtn?: MouseEventHandler<HTMLButtonElement> | undefined;
  SearchForm?: boolean;
};

const Forms = ({
  schema,
  defaultValues,
  className,
  SearchForm = false,
  children,
  onSubmit = (data) => console.log(data),
  submitButtonLabel = "저장",
  linkButtonLabel = "목록",
  onClickLinkBtn,
}: FormsProps) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const formsContextValue = useMemo<FormsContext>(() => {
    return { form: form, isSearchForm: SearchForm };
  }, [form, SearchForm]);

  if (!SearchForm)
    return (
      <FormsContext.Provider value={formsContextValue}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn("size-full -mt-1 flex flex-col gap-2", className)}
          >
            {children}
            <div className="w-full pt-4 flex justify-end gap-2">
              <Button
                type="submit"
                className={!!onClickLinkBtn ? "w-20" : "w-full"}
              >
                {submitButtonLabel}
              </Button>
              {onClickLinkBtn && (
                <Button
                  type="button"
                  variant="secondary"
                  className="w-20"
                  onClick={onClickLinkBtn}
                >
                  {linkButtonLabel}
                </Button>
              )}
            </div>
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

export type formsItemProps = {
  name: string;
  label: string;
  value?: string | number | readonly string[] | undefined;
  defaultValue?: any;
  disabled?: boolean;
  placeholder?: string;
  description?: string;
  fullHeight?: boolean;
  hideLabel?: boolean;
  tabIndex?: number | undefined;
  autoFocus?: boolean | undefined;
  className?: string;
};

const FormsItem = ({
  name,
  label,
  description,
  fullHeight = false,
  hideLabel = false,
  className,
  render,
}: formsItemProps & {
  render: (field: ControllerRenderProps<any, string>) => JSX.Element;
}) => {
  const context = usePageForm();

  if (context) {
    const form = context.form;
    const isSearchForm = context.isSearchForm;
    if (!isSearchForm) {
      return (
        <FormField
          name={name}
          control={form.control}
          render={({ field }) => (
            <FormItem
              className={cn(
                "w-full flex flex-col relative md:my-2.5",
                fullHeight && "h-full",
                className
              )}
            >
              <div className="size-full flex flex-col gap-1 md:flex-row">
                <FormLabel
                  className={cn(
                    "text-sm md:text-base md:w-[10em] md:shrink-0 md:self-center",
                    fullHeight && "md:self-start md:pt-2",
                    hideLabel && "invisible md:hidden"
                  )}
                >
                  {label}
                </FormLabel>
                <div className="size-full">
                  {render(field)}
                  {description && (
                    <FormDescription
                      className={cn(
                        "mx-1 text-xs break-keep md:absolute",
                        form.formState.errors.files ? "hidden" : ""
                      )}
                    >
                      {description}
                    </FormDescription>
                  )}
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    } else {
      return (
        <FormField
          name={name}
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
