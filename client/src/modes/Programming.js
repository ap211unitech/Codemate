import React, { Fragment, useEffect, useState } from 'react';
import "../programming.css";
import DownloadLink from "react-download-link";
import CPPEditor from '../components/CPPEditor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRunning, faFileDownload } from '@fortawesome/free-solid-svg-icons';
import { defaultCode } from "../utils/default";
import axios from "axios";

function Programming() {


    const [code, setCode] = useState();
    const [inputValue, setInputValue] = useState('');
    const [outputValue, setOutputValue] = useState('');
    const [errMessage, setErrMessage] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(true);

    const runProgram = async () => {
        try {
            setOutputValue('Compiling...');
            const res = await axios.post('/compile', { code, lang: 'cpp', input: inputValue });
            if (res.data.err) {
                setErrMessage(res.data.error);
                setOutputValue('');
            }
            else {
                setErrMessage('');
                setOutputValue(res.data.output);
            }
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

    const toggleMode = () => {
        setIsDarkMode(!isDarkMode);
    }

    return <div
        style={{
            background: isDarkMode ? "rgb(21 55 106 / 90%)" : "rgb(88 125 137)",
            paddingTop: "40px"
        }}>
        <div
            style={{
                margin: "auto",
                maxWidth: "70rem",
            }}>
            <div className="editor">
                <CPPEditor
                    code={code}
                    lang={"cpp"}
                    handleChange={handleChange}
                    theme={isDarkMode ? "vs-dark" : "light"}
                />
            </div>

            <div className="cpp-nav">
                <div className="left-nav">
                    <p onClick={runProgram}>
                        <FontAwesomeIcon icon={faRunning} size='lg' style={{ marginRight: "7px" }} />
                        Run
                    </p>
                    {/* <p onClick={formatCode} >
                        {"{} Beautify"}
                    </p> */}
                    <DownloadLink
                        style={{ textDecoration: "none", color: "white" }}
                        label={
                            <Fragment>
                                <FontAwesomeIcon icon={faFileDownload} size='lg' style={{ marginRight: "8px" }} />
                                Download
                            </Fragment>
                        }
                        tagName="p"
                        filename="main.cpp"
                        exportFile={() => Promise.resolve(code)}
                    />

                </div>
                <div className="right-nav">
                    <div className="mode">
                        {isDarkMode ?
                            <p onClick={toggleMode}>Enable Light Mode</p> :
                            <p onClick={toggleMode}>Enable Dark Mode</p>
                        }
                    </div>
                </div>
            </div>

            <div className="err-msg">
                {errMessage}
            </div>

            <div id="input-output-column">
                <div className="input">
                    Provide Input
                    <textarea
                        name="Input"
                        id="input-textarea"
                        cols="60"
                        rows="10"
                        // placeholder="Give Your Input Here"
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
                        // placeholder="Output will show up here"
                        value={outputValue}
                        onChange={e => setOutputValue(e.target.value)}
                        readOnly={true}
                    />
                </div>
            </div>
        </div>
    </div>
}

export default Programming;
