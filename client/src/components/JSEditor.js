import React, { Fragment } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2'
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript";
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/edit/matchtags'
import 'codemirror/src/input/indent'
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/anyword-hint';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJs } from '@fortawesome/free-brands-svg-icons';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';

function Editor({ value, handleChange, refresh, handleRefresh, setJSCode }) {

    const formatCode = async () => {
        try {
            const res = await axios.post('/prettify', { code: value, language: 'typescript' });
            setJSCode(res.data)
            localStorage.setItem('jsCode', res.data);
        } catch (err) { }
    }

    return <Fragment>
        <div className="editor-nav #212121 grey darken-4 white-text">
            <div className="left-editor-nav">
                <p className='#212121 grey darken-4 white-text' style={{ padding: '5px 5px 5px 15px', margin: 0 }} >
                    <FontAwesomeIcon icon={faJs} size='lg' color='yellow' style={{ marginRight: 4 }} /> JS </p>
            </div>
            <div className="right-editor-nav">
                <p className='waves-effect waves-light btn-small' onClick={() => formatCode()}>{`{} Beautify`}</p>
                <p className="waves-effect waves-light btn-small" style={{ margin: '0px 1px 0px 8px' }} onClick={() => handleRefresh('js')} >
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
                mode: 'javascript',
                theme: "material",
                lineNumbers: true,
                matchBrackets: true,
                autoCloseBrackets: true,
                matchTags: true,
                autoCloseTags: true,
                tabSize: 4
            }}
        />
    </Fragment>;
}

export default Editor;
