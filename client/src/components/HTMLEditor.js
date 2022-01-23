import React, { Fragment } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2'
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHtml5 } from '@fortawesome/free-brands-svg-icons';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

function Editor({ value, handleChange, refresh, handleRefresh }) {

    return <Fragment>
        <div className="editor-nav #212121 grey darken-4 white-text">
            <div className="left-editor-nav">
                <p style={{ padding: '5px 5px 5px 15px', margin: 0 }} >
                    <FontAwesomeIcon icon={faHtml5} size='lg' color='red' style={{ marginRight: 4 }} /> HTML</p>
            </div>
            <div className="right-editor-nav">
                <FontAwesomeIcon className={refresh ? 'rotate' : ''} onClick={() => handleRefresh('html')} icon={faSyncAlt} size='lg' color='white' style={{ margin: '10 20 8 auto', cursor: 'pointer' }} />
            </div>
        </div>
        <CodeMirror
            value={value}
            onBeforeChange={handleChange}
            options={{
                lineWrapping: true,
                lint: true,
                mode: 'xml',
                theme: "material",
                lineNumbers: true,
            }}
        />
    </Fragment>;
}

export default Editor;
