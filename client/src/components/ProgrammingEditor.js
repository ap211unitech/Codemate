import React, { useState } from 'react';
import Editor from "@monaco-editor/react";
import { HashLoader } from "react-spinners";

function CPPEditor({ code, handleChange, theme, lang }) {
    const [isEditorReady, setIsEditorReady] = useState(false);


    const options = {
        selectOnLineNumbers: true,
        renderIndentGuides: true,
        colorDecorators: true,
        cursorBlinking: "blink",
        autoClosingQuotes: "always",
        find: {
            autoFindInSelection: "always"
        },
        indentSize: 40,
        tabSize: 6,
        formatOnType: true,
        showSnippets: true,
        snippetSuggestions: "inline",
        wordWrap: "on",
        fontSize: 15.5,
        quickSuggestions: true,
        quickSuggestionsDelay: 100,
    };

    function handleEditorDidMount() {
        setIsEditorReady(true);
    }

    return <div>
        <div className="cpp-editor">
            <Editor
                height={"80vh"}
                theme={theme}
                language={lang}
                options={options}
                value={code}
                loading={<HashLoader color='white' />}
                editorDidMount={handleEditorDidMount}
                onChange={handleChange}
            />
        </div>
    </div>
}

export default CPPEditor;
