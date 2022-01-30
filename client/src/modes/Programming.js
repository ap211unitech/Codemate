import "../programming.css";
import { defaultCode } from "../utils/default"

import React, { Fragment, useEffect, useState } from 'react';
import CPPEditor from '../components/CPPEditor';

import axios from "axios";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRunning } from '@fortawesome/free-solid-svg-icons';


function Programming() {


    const [code, setCode] = useState();
    const [inputValue, setInputValue] = useState('');
    const [outputValue, setOutputValue] = useState('');


    const runProgram = async () => {
        try {
            setOutputValue('');
            const res = await axios.post('/compile', { code, lang: 'cpp', input: inputValue });
            setOutputValue(res.data.output)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (localStorage.getItem('cppCode')) {
            setCode(localStorage.getItem('cppCode'));
        }
        else {
            setCode(defaultCode.cppCode)
        }
    }, [])

    const handleChange = (newCode, e) => {
        setCode(newCode);
        localStorage.setItem("cppCode", newCode);
    }

    return <div
    // style={{
    //     background: 'black',
    //     height: '100vh',
    //     marginTop: '-20px'
    // }}
    >
        <div className="cpp-nav">
            <div className="left-nav">
                <p onClick={runProgram} >
                    <FontAwesomeIcon icon={faRunning} size='lg' style={{ marginRight: "6px" }} />
                    Run
                </p>
                <p>Beautify</p>
            </div>
            <div className="right-nav">
                ChangeTheme
            </div>
        </div>

        <div
        // style={{
        //     margin: '20px',
        //     // background: 'black',
        //     // opacity: 0.8
        // }}
        >
            <div className="editor">
                <CPPEditor code={code} handleChange={handleChange} />
            </div>

            <div id="input-output-column">
                <div className="input">
                    Give Input Here
                    <textarea
                        name="Input"
                        id="input-textarea"
                        cols="60"
                        rows="10"
                        placeholder="Give Your Input Here"
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                    />
                </div>
                <div className="output">
                    Output
                    <textarea
                        name="Output"
                        id="output-textarea"
                        cols="60"
                        rows="10"
                        placeholder="Output will show up here"
                        value={outputValue}
                        onChange={e => setOutputValue(e.target.value)}
                    />
                </div>
            </div>
        </div>
    </div>
}

export default Programming;
