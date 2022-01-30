import React, { Fragment, useState } from 'react';
import Editor from "@monaco-editor/react";



function CPPEditor({ code, handleChange }) {
    const [theme, setTheme] = useState("vs-dark");
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
        snippetSuggestions: "inline",
        wordWrap: "on",
        fontSize: 15.5,
        quickSuggestions: true,
        quickSuggestionsDelay: 100,
    };

    function handleEditorDidMount() {
        setIsEditorReady(true);
    }

    function toggleTheme() {
        setTheme(theme === "light" ? "vs-dark" : "light");
    }

    return <div>

        <div className="cpp-editor">
            <Editor
                height={"60vh"}
                theme={theme}
                language={"cpp"}
                options={options}
                value={code}
                editorDidMount={handleEditorDidMount}
                onChange={handleChange}
            />
        </div>
    </div>
}

export default CPPEditor;
