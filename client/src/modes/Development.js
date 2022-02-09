import '../development.css'
import React, { useEffect, useState } from 'react';
import HTMLEditor from '../components/HTMLEditor';
import CSSEditor from '../components/CSSEditor';
import JSEditor from '../components/JSEditor';
import { Row, Col } from "react-materialize";
import Navbar from "../components/Navbar";

function Development() {

    const [htmlCode, setHTMLCode] = useState(localStorage.getItem('htmlCode'));
    const [cssCode, setCSSCode] = useState(localStorage.getItem('cssCode'));
    const [jsCode, setJSCode] = useState(localStorage.getItem('jsCode'));
    const [output, setOutput] = useState('')

    const [randomQuote, setRandomQuote] = useState('');

    useEffect(() => {
        const getRandomQuote = async () => {
            try {
                const wait = await fetch('https://programming-quotes-api.herokuapp.com/Quotes/random');
                const res = await wait.json();
                if (res.en.length > 120) {
                    getRandomQuote();
                }
                else {
                    setRandomQuote(res.en);
                }
            }
            catch (e) { }
        }
        getRandomQuote();
    }, [])


    const [htmlRefresh, setHTMLrefresh] = useState(false);
    const [cssRefresh, setCSSrefresh] = useState(false);
    const [jsRefresh, setJSrefresh] = useState(false);

    const handleRefresh = (mode) => {
        if (mode == "html") {
            setHTMLrefresh(!htmlRefresh);
            localStorage.removeItem('htmlCode');
            setHTMLCode('');
            setTimeout(() => {
                setHTMLrefresh(false);
            }, 500);
        }
        if (mode == "css") {
            setCSSrefresh(!cssRefresh);
            localStorage.removeItem('cssCode');
            setCSSCode('');
            setTimeout(() => {
                setCSSrefresh(false);
            }, 500);
        }
        if (mode == "js") {
            setJSrefresh(!jsRefresh);
            localStorage.removeItem('jsCode');
            setJSCode('');
            setTimeout(() => {
                setJSrefresh(false);
            }, 500);
        }
    }


    useEffect(() => {
        const timeout = setTimeout(() => {
            setOutput(`
          <!DOCTYPE html>
          <html>
          <body>${htmlCode}</body>
          <style>${cssCode}</style>
          <script>${jsCode}</script>
          </html>`);
        }, 250);
        return () => {
            clearTimeout(timeout);
        };

    }, [htmlCode, cssCode, jsCode])

    const handleHTMLChange = (editor, data, value) => {
        setHTMLCode(value);
        localStorage.setItem('htmlCode', value);
    }

    const handleCSSChange = (editor, data, value) => {
        setCSSCode(value);
        localStorage.setItem('cssCode', value);
    }

    const handleJSChange = (editor, data, value) => {
        setJSCode(value);
        localStorage.setItem('jsCode', value);
    }

    return <div style={{
        backgroundColor: 'hsl(225, 6%, 25%)',
        height: '108vh'
    }}>
        <Navbar color={"#343a40"} />

        <Row>
            <Col
                s={4}
                className='editorStyle'
            >
                <HTMLEditor
                    value={htmlCode}
                    handleChange={handleHTMLChange}
                    refresh={htmlRefresh}
                    handleRefresh={handleRefresh}
                    setHTMLCode={setHTMLCode}
                />
            </Col>
            <Col
                s={4}
                className='editorStyle'
                style={{ padding: '0 0.1rem' }}
            >
                <CSSEditor value={cssCode}
                    handleChange={handleCSSChange}
                    refresh={cssRefresh}
                    handleRefresh={handleRefresh}
                    setCSSCode={setCSSCode}
                />
            </Col>
            <Col
                s={4}
                className='editorStyle'
            >
                <JSEditor value={jsCode}
                    handleChange={handleJSChange}
                    refresh={jsRefresh}
                    handleRefresh={handleRefresh}
                    setJSCode={setJSCode}
                />
            </Col>
        </Row>
        <div className="bottom-pane">
            <iframe
                srcDoc={htmlCode ? output : `<p style='text-align: center;margin-top: 50vh;color: white;font-family: SANS-SERIF;opacity:0.7'>${randomQuote}</p>`}
                title="Output"
                sandbox="allow-scripts"
                style={{
                    backgroundColor: htmlCode ? "white" : "hsl(225.8823529412deg ,13.3858267717% ,40.0980392157%)",
                    overflow: "scroll",
                    outline: "none",
                    border: "none",
                    width: "100%",
                    height: "355px"
                }}
            ></iframe>
        </div>
    </div>;
}

export default Development;
