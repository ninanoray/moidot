"use client";

import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Redo,
  SquareSplitVertical,
  Strikethrough,
  Undo,
} from "lucide-react";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { FormatType } from "./formatType";

interface EditorToolbarProps {
  editor: Editor;
}

const EditorToolbar = ({ editor }: EditorToolbarProps) => {
  return (
    <div
      className={cn(
        "w-full pr-1 flex bg-card rounded-t-md",
        "flex-wrap-reverse min-[440px]:flex-nowrap"
      )}
      aria-label="text editor toolbar"
    >
      <div className={cn("grid grid-cols-6", "min-[440px]:shrink-0")}>
        <Toggle
          size="sm"
          aria-label="bold"
          tabIndex={-1}
          pressed={editor.isActive("bold")}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold />
        </Toggle>
        <Toggle
          size="sm"
          aria-label="italic"
          tabIndex={-1}
          pressed={editor.isActive("italic")}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic />
        </Toggle>
        <Toggle
          size="sm"
          aria-label="strike"
          tabIndex={-1}
          pressed={editor.isActive("strike")}
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough />
        </Toggle>
        <Toggle
          size="sm"
          aria-label="bullet list"
          tabIndex={-1}
          pressed={editor.isActive("bulletList")}
          onPressedChange={() =>
            editor.chain().focus().toggleBulletList().run()
          }
        >
          <List />
        </Toggle>
        <Toggle
          size="sm"
          aria-label="ordered list"
          tabIndex={-1}
          pressed={editor.isActive("orderedList")}
          onPressedChange={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
        >
          <ListOrdered />
        </Toggle>
        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <SquareSplitVertical />
        </ToolbarButton>
      </div>
      <div className="w-full flex justify-between items-center">
        <FormatType editor={editor} />
        <ToggleGroup className="grid grid-cols-2" type="multiple">
          <ToolbarButton onClick={() => editor.chain().focus().undo().run()}>
            <Undo />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().redo().run()}>
            <Redo />
          </ToolbarButton>
        </ToggleGroup>
      </div>
    </div>
  );
};

export default EditorToolbar;

const ToolbarButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const isMobile = useIsMobile();

  return (
    <button
      ref={ref}
      type="button"
      tabIndex={-1}
      className={cn(
        "size-9 flex-center rounded-full transition-colors outline-none",
        !isMobile && "hover:bg-muted",
        "active:bg-accent",
        "[&_svg]:size-4 [&_svg]:shrink-0",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});
ToolbarButton.displayName = "ToolbarButton";
