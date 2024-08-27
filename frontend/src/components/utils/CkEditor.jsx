import React, { useRef, useState } from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import useDebounce from "../../hooks/useDebounce";
import useSearchProfile from "../../hooks/profile/useSearchProfile";
import { Loader2 } from "lucide-react";
const CkEditor = ({ content, setContent }) => {
  const editorRef = useRef(null);
  const [query, setQuery] = useState("");
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
  });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  console.log("query => ", query);
  const { data, isLoading: searchLoad } = useSearchProfile(debouncedQuery);
  console.log("data => ", data);

  // Assume that the editor instance is stored in a ref called editorRef
  const handleUserSelect = (user) => {
    const editor = editorRef.current;
    const model = editor.model;
    const selection = model.document.selection;

    model.change((writer) => {
      // Get the current selection range
      let range = selection.getFirstRange();

      if (!range) {
        // If range is null, set selection to the end of the document
        const endPosition = model.createPositionAt(
          model.document.getRoot(),
          "end"
        );
        range = writer.createRange(endPosition, endPosition);
      }

      // Create a position at the start of the current selection
      const currentPosition = range.start;

      // Get the text up to the current position
      const textBeforeCursor = model.createRange(
        model.createPositionAt(model.document.getRoot(), 0),
        currentPosition
      );

      let atPosition = null;

      for (const item of textBeforeCursor.getItems()) {
        if (item.is("textProxy")) {
          const text = item.data;
          const pos = text.lastIndexOf("@");
          if (pos !== -1) {
            atPosition = currentPosition.getShiftedBy(pos - text.length);
            break;
          }
        }
      }

      if (atPosition) {
        // Create a range that covers the @mention text
        const mentionRange = writer.createRange(atPosition, currentPosition);

        // Delete the partial @mention
        writer.remove(mentionRange);

        // Insert the user tag as a custom mention
        writer.insertText(
          `${user.firstname} ${user.lastname}`,
          {
            linkHref: `/user/${user.username}`,
            mention: {
              id: `@${user.username}`,
              name: `${user.firstname} ${user.lastname}`,
              username: user.username,
            },
          },
          atPosition
        );

        // Insert a space after the mention
        const afterMentionPosition = atPosition.getShiftedBy(
          user.firstname.length + user.lastname.length + 1
        );
        writer.insertText(" ", afterMentionPosition);

        // Move cursor to after the inserted mention and space
        writer.setSelection(afterMentionPosition.getShiftedBy(1));
      } else {
        // If no '@' is found, insert at the current cursor position
        writer.insertText(
          `${user.firstname} ${user.lastname}`,
          {
            linkHref: `/user/${user.username}`,
            mention: {
              id: `@${user.username}`,
              name: `${user.firstname} ${user.lastname}`,
              username: user.username,
            },
          },
          currentPosition
        );

        // Insert a space after the mention
        const afterMentionPosition = currentPosition.getShiftedBy(
          user.firstname.length + user.lastname.length + 1
        );
        writer.insertText(" ", afterMentionPosition);

        // Move cursor to after the inserted mention and space
        writer.setSelection(afterMentionPosition.getShiftedBy(1));
      }
    });

    setShowSuggestions(false);
    // setContent(editor.getData());
    // onChange({ target: { value: editor.getData() } });
  };

  const getCaretCoordinates = (editor) => {
    const view = editor.editing.view;
    const domConverter = editor.editing.view.domConverter;
    const domSelection = view.document.selection;
    const domRange = domConverter.viewRangeToDom(domSelection.getFirstRange());
    const clientRects = domRange.getClientRects();
    if (clientRects.length) {
      const rect = clientRects[0];
      return {
        top: rect.top,
        left: rect.left,
      };
    }
    return { top: 0, left: 0 };
  };
  return (
    <div className="ckeditor-container">
      <CKEditor
        editor={ClassicEditor}
        data={content}
        config={{
          toolbar: [],
          removePlugins: ["Toolbar", "Table"],
          licenseKey:
            "bmpmdkdJYmMva0VxamoxVjZyaDBvOTIvbnVXK2tSSGczMDVma1BhaGNPS0ZoN0daUkZnaHpSc3JvVlVTeWc9PS1NakF5TkRBNU1EVT0=",
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setContent(data);
          const match = data.match(/@(\w+)/);
          if (match) {
            setShowSuggestions(true);
            setQuery(match[1]);
          } else {
            setShowSuggestions(false);
          }
          const caretCoordinates = getCaretCoordinates(editor);
          console.log("Caret Coordinates:", caretCoordinates);
          setPosition({
            top: caretCoordinates.top,
            left: caretCoordinates.left,
          });
        }}
        onReady={(editor) => {
          editorRef.current = editor;
        }}
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
                <div
                  style={{
                    top: `${position.top + 30}px`,
                    left: `${position.left}px`,
                  }}
                  className="w-[350px] z-10 absolute top-[40px] md:right-4 right-0 bg-white rounded border border-gray-300 max-h-[300px] overflow-y-auto"
                >
                  {data?.map((user, i) => (
                    <div
                      key={i}
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
                  ))}
                  {data?.length > 3 && (
                    <div className="border-t border-gray-200">
                      {data.slice(3).map((user, i) => (
                        <div
                          key={i + 3}
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
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CkEditor;
