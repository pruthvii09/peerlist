import React from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

const CkEditor = ({ setContent }) => {
  return (
    <div className="ckeditor-container">
      <CKEditor
        editor={ClassicEditor}
        data={"<p>Write Something....</p>"}
        config={{
          toolbar: [],
          mention: {
            feeds: [
              {
                marker: "@",
                feed: [
                  "@Barney",
                  "@Lily",
                  "@Marry Ann",
                  "@Marshall",
                  "@Robin",
                  "@Ted",
                ],
                minimumCharacters: 1,
              },
            ],
          },
          removePlugins: ["Toolbar", "Table"],
          licenseKey:
            "bmpmdkdJYmMva0VxamoxVjZyaDBvOTIvbnVXK2tSSGczMDVma1BhaGNPS0ZoN0daUkZnaHpSc3JvVlVTeWc9PS1NakF5TkRBNU1EVT0=",
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setContent(data);
        }}
        onReady={(editor) => {}}
      />
    </div>
  );
};

export default CkEditor;
