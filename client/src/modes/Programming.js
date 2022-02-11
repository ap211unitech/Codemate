import React, { Fragment, useEffect, useState } from 'react';
import "../programming.css";
import DownloadLink from "react-download-link";
import ProgrammingEditor from '../components/ProgrammingEditor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRunning, faFileDownload, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { defaults } from "../utils/default";
import errorHandling from "../utils/errorHandling";
import axios from "axios";
import Select from "react-select";
import Navbar from "../components/Navbar";


// React Select Options

const options = [
    { value: 'c', label: 'C', extension: '.c' },
    { value: 'cpp', label: 'C++14', extension: '.cpp' },
    { value: 'python3', label: 'Python3', extension: '.py' },
]

const styles = {

    container: (provided, state) => ({
        ...provided,
        color: 'white',
        width: '10rem'
    }),
    valueContainer: (provided, state) => ({
        ...provided,
        minHeight: '30px',
        color: 'white',
        padding: "0px",
        margin: "-8px 0px -8px 10px",
        textAlign: 'left',
        border: 'none',
        cursor: "pointer"
    }),
    option: (provided, state) => ({
        ...provided,
        minHeight: "20px",
        color: "white",
        backgroundColor: '#414141',
        borderRadius: 0,
        fontSize: "1.1rem",
        borderTop: '1px solid white',
        borderBottom: '2px solid white',
        borderRadius: '0px',
        outline: 'none',
        marginTop: "-5px",
        marginBottom: '-5px',
        padding: "6px 0px 6px 10px",
        cursor: "pointer",
    }),
    singleValue: (provided, state) => ({
        ...provided,
        cursor: "pointer",
        color: "white",
        fontSize: "1.1rem",
        border: 'none',
        borderRadius: '0px',
        outline: 'none',
        margin: "0px",
        padding: "0px",
    }),
    control: (provided, state) => ({
        ...provided,
        border: 0,
        boxShadow: 'none',
        minHeight: '30px',
        borderRadius: "10px 10px 0px 0px",
        backgroundColor: "#212121",
    })
};


function Programming() {

    const [cppLocalStorage, setCppLocalStorage] = useState({
        code: defaults.cppCode,
        lang: "cpp",
    })
    const [cLocalStorage, setCLocalStorage] = useState({
        code: defaults.cCode,
        lang: "c",
    })
    const [pythonLocalStorage, setPythonLocalStorage] = useState({
        code: defaults.pythonCode,
        lang: "python3",
    })

    const [code, setCode] = useState();
    const [inputValue, setInputValue] = useState('');
    const [outputValue, setOutputValue] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState(options[0]);
    const [errMessage, setErrMessage] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(JSON.parse(localStorage.getItem('isDarkMode')));

    useEffect(() => {
        const { value, label } = selectedLanguage;

        if (value == 'c') {
            if (localStorage.getItem('c')) {
                setCLocalStorage(JSON.parse(localStorage.getItem('c')));
                setCode(JSON.parse(localStorage.getItem('c')).code)
            }
            else {
                setCLocalStorage({
                    code: defaults.cCode,
                    lang: "c",
                });
                setCode(cLocalStorage.code)
            }
        }
        else if (value == 'cpp') {
            if (localStorage.getItem('cpp')) {
                setCppLocalStorage(JSON.parse(localStorage.getItem('cpp')));
                setCode(JSON.parse(localStorage.getItem('cpp')).code)
            }
            else {
                setCppLocalStorage({
                    code: defaults.cppCode,
                    lang: "cpp",
                });
                setCode(cppLocalStorage.code)
            }
        }
        else if (value == 'python3') {
            if (localStorage.getItem('python')) {
                setPythonLocalStorage(JSON.parse(localStorage.getItem('python')));
                setCode(JSON.parse(localStorage.getItem('python')).code)
            }
            else {
                setPythonLocalStorage({
                    code: defaults.pythonCode,
                    lang: "python3",
                });
                setCode(pythonLocalStorage.code)
            }
        }
    }, [selectedLanguage])

    const runProgram = async () => {
        try {
            setErrMessage('');
            setOutputValue('Compiling...');
            const res = await axios.post('/compile', { code, lang: selectedLanguage.value, input: inputValue });
            const outputJson = res.data;

            if (outputJson.output.search('Error') != -1 ||
                outputJson.output.search('error') != -1 ||
                outputJson.output.search('Warning') != -1 ||
                outputJson.output.search('warning') != -1 ||
                outputJson.output.search('output Limit reached') != -1 ||
                outputJson.statusCode != 200
            ) {
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

    const resetCode = () => {
        const { value, label } = selectedLanguage;

        if (value == 'c') {
            handleChange(defaults.cCode);
        }
        else if (value == 'cpp') {
            handleChange(defaults.cppCode);
        }
        else if (value == 'python3') {
            handleChange(defaults.pythonCode);
        }

        setErrMessage('');
        setOutputValue('');

    }

    const handleChange = (newCode, e) => {

        const { value, label } = selectedLanguage;

        if (value == 'c') {
            localStorage.setItem("c", JSON.stringify({ ...cLocalStorage, code: newCode }));
            setCode(newCode);
            setCppLocalStorage({ ...cLocalStorage, code: newCode });
        }
        else if (value == 'cpp') {
            localStorage.setItem("cpp", JSON.stringify({ ...cppLocalStorage, code: newCode }));
            setCode(newCode);
            setCppLocalStorage({ ...cppLocalStorage, code: newCode });
        }
        else if (value == 'python3') {
            localStorage.setItem("python", JSON.stringify({ ...pythonLocalStorage, code: newCode }));
            setCode(newCode);
            setCppLocalStorage({ ...pythonLocalStorage, code: newCode });
        }
    }

    const toggleMode = () => {
        localStorage.setItem("isDarkMode", !JSON.parse(localStorage.getItem('isDarkMode')));
        setIsDarkMode(!isDarkMode);
    }


    return <Fragment>

        <Navbar color={"rgb(52 58 64)"} />

        <div
            style={{
                background: isDarkMode ? "rgb(21 55 106 / 90%)" : "rgb(88 125 137)",
                paddingTop: "40px",
            }}>

            <div
                style={{
                    margin: "auto",
                    maxWidth: "70rem",
                }}>


                <div className="editor-navbar">
                    <div className="left-editor-navbar">
                        main{selectedLanguage.extension}
                    </div>
                    <div className="right-editor-navbar" style={{


                    }} >
                        <Select
                            options={options}
                            styles={styles}
                            defaultValue={options[0]}
                            isSearchable={false}
                            onChange={(selectedOption) => setSelectedLanguage(selectedOption)}
                            value={selectedLanguage}
                        // className={"left-editor-navbar"}
                        />
                    </div>
                </div>


                <div className="editor">
                    <ProgrammingEditor
                        code={code}
                        lang={selectedLanguage.value == "python3" ? "python" : selectedLanguage.value}
                        handleChange={handleChange}
                        theme={isDarkMode ? "vs-dark" : "light"}
                    />
                </div>

                <div style={{
                    color: 'white',
                    marginTop: '12px'
                }}>
                    * Your Code will be saved automatically
                </div>

                <div className="programming-footer">
                    <div className="left-footer">
                        <a href="#output-window" style={{ textDecoration: "none", color: 'white' }} >
                            <p onClick={runProgram}>
                                <FontAwesomeIcon icon={faRunning} size='lg' style={{ marginRight: "7px" }} />
                                Run
                            </p>
                        </a>
                        {/* <p onClick={setFormatCode(!formatCode)} >
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
                            filename={`main${selectedLanguage.extension}`}
                            exportFile={() => Promise.resolve(code)}
                        />

                        <p onClick={resetCode}>
                            <FontAwesomeIcon icon={faSyncAlt} size='lg' style={{ marginRight: "7px" }} />
                            Reset
                        </p>

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
                        maxHeight: 300,
                        overflowY: 'scroll',
                        wordWrap: 'break-word'
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
                    <div className="output" id="output-window">
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
    </Fragment >
}

export default Programming;
