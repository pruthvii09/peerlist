import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css"; // import bubble theme styles
import useDebounce from "../../hooks/useDebounce";
import useSearchProfile from "../../hooks/profile/useSearchProfile";

import Quill from "quill";
import { Loader2 } from "lucide-react";

const Embed = Quill.import("blots/embed");

class MentionBlot extends Embed {
  static create(data) {
    const node = super.create();
    node.setAttribute("title", "hi"); // Add this line
    node.innerHTML = `<a href="${data.href}" class="mention">${data.name}</a>`;
    return node;
  }

  static value(node) {
    return {
      name: node.textContent.slice(1),
      username: node.getAttribute("data-username"),
      // href: node.getAttribute("href"),
    };
  }
}

MentionBlot.blotName = "mention";
MentionBlot.tagName = "span";

Quill.register(MentionBlot);

const QuillEditor = ({ value, onChange, initialContent, height }) => {
  const [baseUrl, setBaseUrl] = useState("");
  useEffect(() => {
    const fullUrl = window.location.href;
    const base = new URL(fullUrl).origin;
    setBaseUrl(base);
  }, []);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const quillRef = useRef(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [content, setContent] = useState(
    value || initialContent || "<p>Write Something...</p>"
  );

  useEffect(() => {
    if (initialContent && !content) {
      setContent(initialContent);
    }
    if (quillRef.current) {
      quillRef.current.focus();
    }
  }, [initialContent, content]);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  const { data, isLoading: searchLoad } = useSearchProfile(debouncedQuery);
  console.log("data => ", data);
  const handleChange = (html) => {
    setContent(html);
    onChange({ target: { value: html } });
    const quill = quillRef.current.getEditor();
    const range = quill.getSelection();
    const atIndex = html.indexOf("@");
    if (range) {
      const { index } = range;
      const bounds = quill.getBounds(index);
      setPosition({ top: bounds.top, left: bounds.left });
    }
    if (atIndex !== -1) {
      // Extract the text following "@"
      const afterAt = html.slice(atIndex + 1);
      const match = afterAt.match(/^([^\s<]+)/); // Get text until the next space or HTML tag
      if (match) {
        const queryText = match[1];
        setQuery(queryText);
        console.log("Query:", queryText);
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
    }
  };
  const handleUserSelect = (user) => {
    const quill = quillRef.current.getEditor();
    let range = quill.getSelection();

    if (!range) {
      // If range is null, set selection to the end of the document
      const length = quill?.getLength();
      quill.setSelection(length, 0);
      range = { index: length, length: 0 };
    }

    const text = quill.getText(0, range.index);
    const atPosition = text.lastIndexOf("@");

    if (atPosition !== -1) {
      // Delete the partial @mention
      quill.deleteText(atPosition, range.index - atPosition);
      // Insert the user tag as a custom embed
      quill.insertEmbed(
        atPosition,
        "mention",
        {
          name: `${user?.firstname} ${user?.lastname}`,
          username: user?.username,
          href: `${baseUrl}/user/${user?.username}`,
        },
        "user"
      );
      // Insert a space after the mention
      quill.insertText(atPosition + 1, " ");
      // Move cursor to after the inserted mention and space
      quill.setSelection(atPosition + 2);
    } else {
      // If no '@' is found, insert at the current cursor position
      quill.insertEmbed(
        range.index,
        "mention",
        {
          name: `${user?.firstname} ${user?.lastname}`,
          username: user?.username,
          href: `${baseUrl}/user/${user?.username}`,
        },
        "user"
      );
      // Insert a space after the mention
      quill.insertText(range.index + 1, " ");
      // Move cursor to after the inserted mention and space
      quill.setSelection(range.index + 2);
    }

    setShowSuggestions(false);
    setContent(quill.root.innerHTML);
    onChange({ target: { value: quill.root.innerHTML } });
  };

  return (
    <div className="relative">
      <ReactQuill
        theme=""
        ref={quillRef}
        value={content}
        onChange={handleChange}
        className={`h-[${height}px] overflow-y-auto`}
      />
      {showSuggestions && (
        <>
          {searchLoad ? (
            <div
              style={{
                top: `${position.top + 30}px`,
                left: `${position.left}px`,
              }}
              className="w-[350px] absolute top-[40px] md:right-4 right-0 bg-white rounded border border-gray-300 z-10"
            >
              <div className="py-4 flex items-center justify-center">
                <Loader2 className="animate-spin text-green-600" />
              </div>
            </div>
          ) : (
            <>
              {data?.length <= 0 ? (
                <div
                  style={{
                    top: `${position.top + 30}px`,
                    left: `${position.left}px`,
                  }}
                  className="w-[350px] absolute top-[40px] md:right-4 right-0 bg-white rounded border border-gray-300 z-10"
                >
                  <div className="py-4 text-red-500 text-sm px-4">
                    No user found
                  </div>
                </div>
              ) : (
                <>
                  {data?.map((user, i) => (
                    <div
                      key={i}
                      style={{
                        top: `${position.top + 30}px`,
                        left: `${position.left}px`,
                      }}
                      className="w-[350px] z-10 absolute  top-[40px] md:right-4 right-0 bg-white rounded border border-gray-300"
                    >
                      <div
                        className="px-4 py-2 flex items-start gap-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleUserSelect(user)}
                      >
                        <div className="">
                          <img
                            src={user?.profileImageUrl}
                            className="w-8 h-8 rounded-full object-cover"
                            alt=""
                          />
                        </div>
                        <div>
                          <h1 className="text-sm font-semibold">
                            {user.firstname} {user.lastname}
                          </h1>
                          <p className="text-xs text-gray-600 paragraph-clamp">
                            {user.bio}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default QuillEditor;
