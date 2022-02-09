import React, { Fragment } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2'
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/matchtags';
import 'codemirror/src/input/indent';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/html-hint';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHtml5 } from '@fortawesome/free-brands-svg-icons';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function Editor({ value, handleChange, refresh, handleRefresh, setHTMLCode }) {

    const formatCode = async () => {
        try {
            const res = await axios.post('/prettify', { code: value, language: 'html' });
            setHTMLCode(res.data)
            localStorage.setItem('htmlCode', res.data);
        } catch (err) { }
    }

    return <Fragment>
        <div className="editor-nav #212121 grey darken-4 white-text">
            <div className="left-editor-nav">
                <p style={{ padding: '5px 5px 5px 15px', margin: 0 }} >
                    <FontAwesomeIcon icon={faHtml5} size='lg' color='red' style={{ marginRight: 4 }} /> HTML</p>
            </div>
            <div className="right-editor-nav">
                <p className='waves-effect waves-light btn-small ' onClick={() => formatCode()}>{`{} Beautify`}</p>
                <p className="waves-effect waves-light btn-small" style={{ margin: '0px 1px 0px 8px' }} onClick={() => handleRefresh('html')} >
                    <FontAwesomeIcon className={refresh ? 'rotate' : ''} icon={faSyncAlt} size='lg' color='white' />{' '} Reset
                </p>
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
                matchBrackets: true,
                autoCloseBrackets: true,
                matchTags: true,
                autoCloseTags: true,
                tabSize: 4,
            }}
        />
    </Fragment>;
}

export default Editor;
