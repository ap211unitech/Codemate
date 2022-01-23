import React, { Fragment } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2'
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/clike/clike";

function CPPEditor({ value, handleChange }) {

    return <Fragment>
        <CodeMirror
            value={value}
            onBeforeChange={handleChange}
            options={{
                lineWrapping: true,
                lint: true,
                mode: 'clike',
                theme: "material",
                lineNumbers: true,
            }}
            cm-setSize='400 500'
        />
    </Fragment>
}

export default CPPEditor;
