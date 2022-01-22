import React, { Fragment } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2'
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/css/css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCss3 } from '@fortawesome/free-brands-svg-icons'

function Editor({ value, handleChange }) {

    return <Fragment>
        <p className='#212121 grey darken-4 white-text' style={{ padding: '5px 5px 5px 15px', margin: 0 }} >
            <FontAwesomeIcon icon={faCss3} size='lg' color='skyblue' style={{ marginRight: 4 }} /> CSS </p>
        <CodeMirror
            value={value}
            onBeforeChange={handleChange}
            options={{
                mode: 'css',
                theme: 'material',
                lineNumbers: true
            }}
        />
    </Fragment>;
}

export default Editor;
