import React, { useEffect, useState } from 'react';
import HTMLEditor from '../components/HTMLEditor';
import CSSEditor from '../components/CSSEditor';
import JSEditor from '../components/JSEditor';
import { Row, Col } from "react-materialize";

function Development() {

    const [htmlCode, setHTMLCode] = useState('');
    const [cssCode, setCSSCode] = useState('');
    const [jsCode, setJSCode] = useState('');
    const [output, setOutput] = useState('')

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
    }

    const handleCSSChange = (editor, data, value) => {
        setCSSCode(value);
    }

    const handleJSChange = (editor, data, value) => {
        setJSCode(value);
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
                <HTMLEditor value={htmlCode} handleChange={handleHTMLChange} />
            </Col>
            <Col
                s={4}
                className='editorStyle'
            >
                <CSSEditor value={cssCode} handleChange={handleCSSChange} />
            </Col>
            <Col
                s={4}
                className='editorStyle'
            >
                <JSEditor value={jsCode} handleChange={handleJSChange} />
            </Col>
        </Row>
        <div>
        </div>
        <div className="bottom-pane">
            <iframe
                srcDoc={output}
                title="Output"
                sandbox="allow-scripts"
                style={{
                    backgroundColor: "white",
                    overflow: "scroll",
                    outline: "none",
                    border: "none",
                    width: "100%",
                    padding: 10,
                    height: "340px"
                }}
            ></iframe>
        </div>
    </div>;
}

export default Development;
