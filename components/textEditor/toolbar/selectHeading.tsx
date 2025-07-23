import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Editor } from "@tiptap/react";

interface Props {
  editor: Editor;
  className?: string;
}

export function SelectHeading({ editor, className }: Props) {
  const value = () => {
    if (editor.isActive("paragraph")) return "paragraph";
    else if (editor.isActive("heading", { level: 1 })) return "h1";
    else if (editor.isActive("heading", { level: 2 })) return "h2";
    else if (editor.isActive("heading", { level: 3 })) return "h3";
  };

  const onChange = (value: string) => {
    switch (value) {
      case "paragraph":
        editor.chain().focus().setParagraph().run();
        break;
      case "h1":
        editor.chain().focus().toggleHeading({ level: 1 }).run();
        break;
      case "h2":
        editor.chain().focus().toggleHeading({ level: 2 }).run();
        break;
      case "h3":
        editor.chain().focus().toggleHeading({ level: 3 }).run();
        break;
    }
  };

  return (
    <Select onValueChange={onChange} defaultValue={value()} value={value()}>
      <SelectTrigger
        tabIndex={-1}
        className={cn(
          "max-h-8 sm:max-h-7 w-[88px] mx-1 text-sm sm:text-xs bg-accent dark:bg-accent/80 border-0 rounded-full transition-all hover:brightness-90",
          className
        )}
      >
        <SelectValue placeholder="크기" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="paragraph">본문</SelectItem>
          <SelectItem value="h1">제목 1</SelectItem>
          <SelectItem value="h2">제목 2</SelectItem>
          <SelectItem value="h3">제목 3</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
