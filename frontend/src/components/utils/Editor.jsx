import React, { useEffect } from "react";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

const Editor = ({ value, onChange, initialContent, editable }) => {
  const editor = useCreateBlockNote({
    initialContent:
      initialContent && initialContent.length > 0
        ? initialContent
        : [
            {
              id: "ec289355-81dc-4f57-a829-8f6fd755b539",
              type: "paragraph",
              props: {
                textColor: "default",
                backgroundColor: "default",
                textAlignment: "left",
              },
              content: [
                {
                  type: "text",
                  text: "Share Your Thoughts...",
                  styles: {},
                },
              ],
              children: [],
            },
          ], // Set initial content if provided and non-empty
  });

  useEffect(() => {
    if (editor) {
      editor.onChange(() => {
        const content = editor.document;
        // Filter out empty blocks
        const filteredContent = content.filter(
          (block) => block.content.length > 0 || block.children.length > 0
        );
        onChange({ target: { value: filteredContent } });
        console.log(filteredContent);
      });
    }
  }, [editor, onChange]);

  return (
    <BlockNoteView
      className="h-[200px] overflow-y-auto"
      theme="light"
      editor={editor}
    />
  );
};

export default Editor;
