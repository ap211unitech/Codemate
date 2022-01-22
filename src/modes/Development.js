import React, { useEffect, useState } from 'react';
import HTMLEditor from '../components/HTMLEditor';
import CSSEditor from '../components/CSSEditor';
import JSEditor from '../components/JSEditor';
import { Row, Col } from "react-materialize";

function Development() {

    const [htmlCode, setHTMLCode] = useState(localStorage.getItem('htmlCode'));
    const [cssCode, setCSSCode] = useState(localStorage.getItem('cssCode'));
    const [jsCode, setJSCode] = useState(localStorage.getItem('jsCode'));
    const [output, setOutput] = useState('')

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
        height: '100vh'
    }}>
        <Row>
            <Col
                s={4}
                className='editorStyle'
            >
                <HTMLEditor value={htmlCode} handleChange={handleHTMLChange} refresh={htmlRefresh} handleRefresh={handleRefresh} />
            </Col>
            <Col
                s={4}
                className='editorStyle'
            >
                <CSSEditor value={cssCode} handleChange={handleCSSChange} refresh={cssRefresh} handleRefresh={handleRefresh} />
            </Col>
            <Col
                s={4}
                className='editorStyle'
            >
                <JSEditor value={jsCode} handleChange={handleJSChange} refresh={jsRefresh} handleRefresh={handleRefresh} />
            </Col>
        </Row>
        <div>
        </div>
        <div className="bottom-pane">
            <iframe
                srcDoc={htmlCode ? output : "<p style='text-align: center;margin-top: 50vh;color: white;font-family: SANS-SERIF;'>See Your Output Here</p>"}
                title="Output"
                sandbox="allow-scripts"
                style={{
                    backgroundColor: htmlCode ? "white" : "hsl(225.8823529412deg ,13.3858267717% ,40.0980392157%)",
                    overflow: "scroll",
                    outline: "none",
                    border: "none",
                    width: "100%",
                    height: "340px"
                }}
            ></iframe>
        </div>
    </div>;
}

export default Development;
