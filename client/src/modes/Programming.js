import React, { Fragment, useEffect, useState } from 'react';
import "../programming.css";
import DownloadLink from "react-download-link";
import CPPEditor from '../components/CPPEditor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRunning, faFileDownload, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { defaults } from "../utils/default";
import errorHandling from "../utils/errorHandling";
import axios from "axios";
import Select from "react-select";
import Navbar from "../components/Navbar";


// React Select Options

const options = [
    { value: 'c', label: 'C' },
    { value: 'cpp', label: 'C++14' },
    { value: 'python', label: 'Python3' },
    { value: 'java', label: 'Java' },
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
        isDarkMode: true
    })

    const [code, setCode] = useState();
    const [inputValue, setInputValue] = useState('');
    const [outputValue, setOutputValue] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [errMessage, setErrMessage] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        
    }, [])

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

    const resetCode = () => {
        handleChange(defaults.cppCode);
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


                <div className="editor-navbar">
                    <div className="left-editor-navbar">
                        main.cpp
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
                    <CPPEditor
                        code={code}
                        lang={"cpp"}
                        handleChange={handleChange}
                        theme={isDarkMode ? "vs-dark" : "light"}
                    />
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
                            filename="main.cpp"
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
