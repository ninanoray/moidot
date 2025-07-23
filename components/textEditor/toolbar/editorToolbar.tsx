"use client";

import { RippleButton } from "@/components/animate-ui/buttons/ripple";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/animate-ui/radix/toggle-group";
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
import { SelectHeading } from "./selectHeading";

interface EditorToolbarProps {
  editor: Editor;
}

const EditorToolbar = ({ editor }: EditorToolbarProps) => {
  return (
    <div
      className="w-full pr-1 flex bg-card rounded-t-md flex-wrap-reverse min-[440px]:flex-nowrap"
      aria-label="editor-toolbar"
    >
      <div className="flex min-[440px]:shrink-0">
        <ToggleGroup
          type="multiple"
          onValueChange={(value) => {
            if (value.includes("bold")) editor.commands.setBold();
            else editor.commands.unsetBold();
            if (value.includes("italic")) editor.commands.setItalic();
            else editor.commands.unsetItalic();
            if (value.includes("strike")) editor.commands.setStrike();
            else editor.commands.unsetStrike();
          }}
        >
          <ToggleGroupItem
            size="sm"
            value="bold"
            aria-label="toggle-bold"
            tabIndex={-1}
          >
            <Bold />
          </ToggleGroupItem>
          <ToggleGroupItem
            size="sm"
            value="italic"
            aria-label="toggle-italic"
            tabIndex={-1}
          >
            <Italic />
          </ToggleGroupItem>
          <ToggleGroupItem
            size="sm"
            value="strike"
            aria-label="toggle-strike"
            tabIndex={-1}
          >
            <Strikethrough />
          </ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup
          type="single"
          onValueChange={(value) => {
            if (value) {
              editor.commands.toggleList(value, "listItem");
            } else {
              if (editor.isActive("bulletList"))
                editor.commands.toggleBulletList();
              if (editor.isActive("orderedList"))
                editor.commands.toggleOrderedList();
            }
          }}
        >
          <ToggleGroupItem
            size="sm"
            value="bulletList"
            aria-label="toggle-bullet-list"
            tabIndex={-1}
          >
            <List />
          </ToggleGroupItem>
          <ToggleGroupItem
            size="sm"
            value="orderedList"
            aria-label="toggle-ordered-list"
            tabIndex={-1}
          >
            <ListOrdered />
          </ToggleGroupItem>
        </ToggleGroup>
        <RippleButton
          type="button"
          variant="outline"
          className="bg-transparent border-0"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <SquareSplitVertical />
        </RippleButton>
      </div>
      <div className="w-full flex justify-between items-center">
        <SelectHeading editor={editor} />
        <div className="grid grid-cols-2">
          <RippleButton
            type="button"
            variant="outline"
            className="rounded-full bg-transparent border-0"
            onClick={() => editor.chain().focus().undo().run()}
          >
            <Undo />
          </RippleButton>
          <RippleButton
            type="button"
            variant="outline"
            className="rounded-full bg-transparent border-0"
            onClick={() => editor.chain().focus().redo().run()}
          >
            <Redo />
          </RippleButton>
        </div>
      </div>
    </div>
  );
};

export default EditorToolbar;
