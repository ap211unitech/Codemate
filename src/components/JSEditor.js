import React, { Fragment, useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2'
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faJs } from '@fortawesome/free-brands-svg-icons'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'

function Editor({ value, handleChange, refresh, handleRefresh }) {

    return <Fragment>
        <div className="editor-nav #212121 grey darken-4 white-text">
            <div className="left-editor-nav">
                <p className='#212121 grey darken-4 white-text' style={{ padding: '5px 5px 5px 15px', margin: 0 }} >
                    <FontAwesomeIcon icon={faJs} size='lg' color='yellow' style={{ marginRight: 4 }} /> JS </p>
            </div>
            <div className="right-editor-nav">
                <FontAwesomeIcon className={refresh ? 'rotate' : ''} onClick={() => handleRefresh('js')} icon={faSyncAlt} size='lg' color='white' style={{ margin: '10 20 8 auto', cursor: 'pointer' }} />
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
                lineNumbers: true
            }}
        />
    </Fragment>;
}

export default Editor;
