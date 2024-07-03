import React from "react";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import "./scroll.module.css";
const PostTextArea = ({ initialContent }) => {
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
            {
              id: "9ffbfaa3-7216-47cc-a1a6-e03f1a9e8fb6",
              type: "paragraph",
              props: {
                textColor: "default",
                backgroundColor: "default",
                textAlignment: "left",
              },
              content: [],
              children: [],
            },
          ],
  });
  return (
    <BlockNoteView
      className="text-sm"
      theme="light"
      editable={false}
      editor={editor}
    />
  );
};

export default PostTextArea;
