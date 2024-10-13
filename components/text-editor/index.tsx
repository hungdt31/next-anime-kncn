// import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import { Button } from "@/components/ui/button";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import { Buttons } from "./buttons";
import { ButtonProps } from "./button-props";

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  Image.configure({}),
  TextStyle.configure({}),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  // StarterKit.configure({
  //   bulletList: {
  //     keepMarks: true,
  //     keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
  //   },
  //   orderedList: {
  //     keepMarks: true,
  //     keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
  //   },
  // }),
];

export default function TextEditor({
  onChange,
  defaultContent,
  focusFunc,
  content,
}: {
  onChange: (value: string) => void;
  defaultContent?: string;
  focusFunc?: () => void;
  content?: string | undefined;
}) {
  const MenuBar = () => {
    const { editor } = useCurrentEditor();

    if (!editor) {
      return null;
    }
    let buttons: ButtonProps[] = [];
    for (const button of Buttons) {
      buttons.push(button(editor));
    }
    return (
      <div className="control-group">
        <div className="button-group flex gap-3 flex-wrap mb-3">
          {buttons.map((e, index) => (
            <Button
              type="button"
              key={index}
              onClick={e.onClick}
              disabled={e.disabled}
              variant={e.variant}
            >
              {e.label}
            </Button>
          ))}
        </div>
        <hr />
      </div>
    );
  };
  return (
    <div className="border-border border-2 shadow-lg rounded-lg p-3 mt-5 mb-3 lg:w-[70%]">
      <EditorProvider
        slotBefore={<MenuBar />}
        extensions={extensions}
        content={content}
        onUpdate={({ editor }) => {
          onChange(editor.getHTML());
        }}
        onBeforeCreate={() => {
          defaultContent ? onChange(defaultContent) : onChange(content || "");
        }}
        onFocus={focusFunc}
      />
    </div>
  );
}
