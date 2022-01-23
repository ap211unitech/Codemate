import React, { Fragment, useState } from 'react';
import CPPEditor from '../components/CPPEditor';

function Programming() {

    const [code, setCode] = useState('');

    const handleChange = (editor, data, value) => {
        setCode(value);
    }

    return <Fragment>
        <div className="editor">
            <CPPEditor value={code} handleChange={handleChange} />

        </div>
        <div className="input">
            Give Input Here
        </div>
        <div className="output">
            Output
        </div>
    </Fragment>
}

export default Programming;
