import React, { Fragment, useEffect, useState } from 'react';
import "../programming.css";
import DownloadLink from "react-download-link";
import CPPEditor from '../components/CPPEditor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRunning, faFileDownload } from '@fortawesome/free-solid-svg-icons';
import { defaults } from "../utils/default";
import errorHandling from "../utils/errorHandling";
import axios from "axios";
import Navbar from "../components/Navbar"

function Programming() {

    const [cppLocalStorage, setCppLocalStorage] = useState({
        code: defaults.cppCode,
        lang: "cpp",
        isDarkMode: true
    })

    const [code, setCode] = useState();
    const [inputValue, setInputValue] = useState('');
    const [outputValue, setOutputValue] = useState('');
    const [errMessage, setErrMessage] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('cpp')) {
            setCppLocalStorage(JSON.parse(localStorage.getItem('cpp')));
            setCode(JSON.parse(localStorage.getItem('cpp')).code)
            setIsDarkMode(JSON.parse(localStorage.getItem('cpp')).isDarkMode)
        }
        else {
            setCppLocalStorage({
                code: defaults.cppCode,
                lang: "cpp",
                isDarkMode: true
            });
            setCode(cppLocalStorage.code)
            setIsDarkMode(cppLocalStorage.isDarkMode)
        }
    }, [])

    const runProgram = async () => {
        try {
            setErrMessage('');
            setOutputValue('Compiling...');
            const res = await axios.post('/compile', { code, lang: 'cpp', input: inputValue });
            const outputJson = res.data;
            if (outputJson.memory == null && outputJson.cpuTime == null) {
                setErrMessage(errorHandling(outputJson));
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

    const handleChange = (newCode, e) => {
        localStorage.setItem("cpp", JSON.stringify({ ...cppLocalStorage, code: newCode }));
        setCode(newCode);
        setCppLocalStorage({ ...cppLocalStorage, code: newCode });
    }

    const toggleMode = () => {
        localStorage.setItem("cpp", JSON.stringify({ ...cppLocalStorage, isDarkMode: isDarkMode ? false : true }));
        setCppLocalStorage({ ...cppLocalStorage, isDarkMode: !isDarkMode });
        setIsDarkMode(!isDarkMode);
    }

    return <Fragment>

        <Navbar color={"rgb(52, 58, 64)"} />
        <div
            style={{
                background: isDarkMode ? "rgb(21 55 106 / 90%)" : "rgb(88 125 137)",
                paddingTop: "40px"
            }}>


            <div
                style={{
                    margin: "auto",
                    maxWidth: "70rem",
                }}>


                <div>

                    <div className="left">

                    </div>

                    <div className="right">
                        {/* <div className="dropdown">
                        <button className="dropbtn">Dropdown</button>
                        <div className="dropdown-content">
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                    </div> */}
                    </div>

                </div>


                <div className="editor">
                    <CPPEditor
                        code={code}
                        lang={"cpp"}
                        handleChange={handleChange}
                        theme={isDarkMode ? "vs-dark" : "light"}
                    />
                </div>

                <div className="programming-footer">
                    <div className="left-footer">
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
                    <div className="right-footer">
                        <div className="mode">
                            {isDarkMode ?
                                <p onClick={toggleMode}>Enable Light Mode</p> :
                                <p onClick={toggleMode}>Enable Dark Mode</p>
                            }
                        </div>
                    </div>
                </div>

                <div className="err-msg"
                    style={errMessage ? {
                        marginTop: "5px",
                        marginBottom: "10px",
                        border: "2px solid #e74c3c",
                        backgroundColor: "#e74c3c",
                        borderRadius: "5px",
                        padding: "8px",
                    } :
                        null
                    }
                >
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
        </div >
    </Fragment>
}

export default Programming;
