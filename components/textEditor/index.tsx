"use client";

import { cn } from "@/lib/utils";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Content, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ClipboardList, Share2 } from "lucide-react";
import { Button } from "../ui/button";
import EditorToolbar from "./toolbar/editorToolbar";

interface EditorProps {
  content: Content;
  placeholder?: string;
  className?: string;
  onChange: (value: string) => void;
}

export const editorTextAreaStyle = [
  "prose prose-sm dark:prose-invert max-w-none",
  "prose-h1:m-0 prose-h1:text-2xl prose-h1:font-bold",
  "prose-h2:m-0 prose-h2:text-xl prose-h2:font-semibold",
  "prose-h3:m-0 prose-h3:text-lg prose-h3:font-normal",
  "prose-p:m-0 prose-p:text-sm prose-p:font-normal prose-p:text-foreground",
  "prose-ul:m-0 prose-ol:m-0",
  "prose-li:m-0 prose-li:p-0 prose-li:marker:text-foreground/80",
  "prose-hr:mt-[0.9em] prose-hr:mb-[0.5em] prose-hr:border-foreground/50",
];

const TextEditor = ({
  content,
  placeholder,
  className,
  onChange,
  ...props
}: EditorProps) => {
  const editor = useEditor(
    {
      editorProps: {
        attributes: {
          class:
            "h-0 px-2 flex-auto overflow-y-auto break-all sm:break-normal focus:outline-none",
        },
      },
      extensions: [
        StarterKit,
        Placeholder.configure({
          placeholder: placeholder,
        }),
      ],
      content: content,
      onUpdate: ({ editor }) => {
        onChange(editor.getHTML());
      },
      immediatelyRender: false,
    },
    [placeholder]
  );

  if (!editor)
    return (
      <div className="size-full border border-input bg-background dark:bg-input/30 rounded-md">
        <div className="w-full h-9 bg-card rounded-t-md"></div>
      </div>
    );

  return (
    <div
      className={cn(
        "tiptap-editor size-full min-w-56 flex flex-col border border-input bg-background dark:bg-input/30 rounded-md trans-200",
        "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px] focus-within:[&_*]:brightness-100",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        editorTextAreaStyle,
        className
      )}
      {...props}
    >
      <EditorToolbar editor={editor} />
      <EditorContent
        editor={editor}
        className="size-full py-2 flex flex-col rounded-b-md transition-all bg-background hover:brightness-90 dark:bg-input/30 dark:hover:brightness-50"
      />
    </div>
  );
};

export default TextEditor;

export const removeHTMLTags = (innerHtml: string) => {
  return innerHtml
    .replace(/<\/?[ol|ul|span|strong|em|s][^>]+(>|$)/g, "")
    .replace(/<\/[^>]+(>|$)/g, `\n`)
    .replace(/<\/?[^>]+(>|$)/g, "");
};

type TextEditReaderProps = {
  innerHtml: string | TrustedHTML | undefined;
  shareData?: string;
  className?: string | undefined;
};
export const TextEditReader = ({
  innerHtml,
  shareData,
  className,
}: TextEditReaderProps) => {
  const isShare = !!navigator.canShare && shareData;

  /**
   * Web Share API를 활용한 텍스트 공유(*https에서만 사용가능)
   */
  const shareTextToWebShareAPI = async (data: string) => {
    try {
      await navigator.share({
        title: "공유하기",
        text: data,
        url: window.location.href,
      });
      return true;
    } catch (e: unknown) {
      const error = e as Error;
      if (error.toString().includes("AbortError")) {
        // alert("전송이 취소되었습니다");
      } else alert("전송에 실패했습니다");
      return false;
    }
  };

  /**
   * text 데이터를 클립보드에 저장
   */
  const copyTextToClipBoard = (text: string | undefined) => {
    if (text) {
      try {
        navigator.clipboard.writeText(text);
        alert("클립보드에 복사가 완료되었습니다.");
      } catch (error) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.setAttribute("readonly", "");
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();

        try {
          const successful = document.execCommand("copy");
          document.body.removeChild(textArea);
          const msg = successful
            ? "클립보드에 복사되었습니다."
            : "복사된 데이터가 없습니다.";
          alert(msg);
        } catch (error) {
          alert("클립보드 복사에 실패하였습니다.");
        }

        return;
      }
    }
  };

  return (
    <div
      className={cn(
        "relative my-1 mb-2 px-1 py-[0.5em] flex flex-col gap-0.5 border-y-2 border-border",
        className
      )}
    >
      {innerHtml ? (
        <>
          <Button
            size="icon"
            variant="secondary"
            className="size-5 self-end"
            onClick={() => {
              if (isShare) shareTextToWebShareAPI(removeHTMLTags(shareData));
              else {
                if (typeof innerHtml === "string")
                  copyTextToClipBoard(removeHTMLTags(innerHtml));
              }
            }}
          >
            {isShare ? (
              <Share2 strokeWidth={1.5} className="size-4" />
            ) : (
              <ClipboardList strokeWidth={1.5} className="size-4" />
            )}
          </Button>
          <div
            className={cn(editorTextAreaStyle)}
            dangerouslySetInnerHTML={{ __html: innerHtml }}
          />
        </>
      ) : (
        <p>{"데이터가 없습니다."}</p>
      )}
    </div>
  );
};
