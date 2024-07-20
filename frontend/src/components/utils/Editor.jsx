import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css"; // import bubble theme styles

const QuillEditor = ({ value, onChange, initialContent, editable }) => {
  const [content, setContent] = useState(
    initialContent || "<p>Write Something...</p>"
  );

  useEffect(() => {
    if (initialContent && !content) {
      setContent(initialContent);
    }
  }, [initialContent]);

  const handleChange = (html) => {
    setContent(html);
    onChange({ target: { value: html } });
  };

  return (
    <ReactQuill
      theme="bubble"
      value={content}
      onChange={handleChange}
      className="h-[200px] overflow-y-auto"
    />
  );
};

export default QuillEditor;
