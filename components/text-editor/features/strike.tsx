import { Editor } from '@tiptap/core'; // Import the Editor type from tiptap
import { FaStrikethrough } from "react-icons/fa"; // Import the FaBold icon from react-icons
import { ButtonProps, checkVariant } from '@/components/text-editor/button-props'; // Import the ButtonProps interface from button-props.ts

export const StrikeButton = (editor: Editor): ButtonProps => ({
  label: <FaStrikethrough/>,
  // @ts-ignore - Suppress the TypeScript error here
  onClick: () => editor.chain().focus().toggleStrike().run(),
  // @ts-ignore - Suppress the TypeScript error here
  disabled: !editor.can().chain().focus().toggleStrike().run(),
  variant: checkVariant(editor, "strike"),
});