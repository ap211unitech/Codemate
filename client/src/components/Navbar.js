import React from 'react';
import { Link } from 'react-router-dom';
import '../main.css'

function Navbar({ isDarkMode, color }) {
    return <div>
        <ul style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: color ? color : isDarkMode ? "rgb(21 55 106 / 90%)" : "rgb(88 125 137)",
            borderBottom: "2px solid #17a2b8"
        }} >
            <div className="left-nav">
                <li><Link to="/">Home</Link></li>
            </div>
            <div className="right-nav">
                <li><a href="https://github.com/ap211unitech/Codemate" target={"_blank"}>Github Repo</a></li>
                <li><Link to="/development_mode">Development Mode</Link></li>
                <li><Link to="/programming_mode">Programming Mode</Link></li>
            </div>
        </ul>
    </div >;
}

export default Navbar;
