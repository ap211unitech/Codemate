import React from 'react';
import Navbar from './Navbar';
import "../main.css";
import { Link } from 'react-router-dom';

function Landing() {
    return <div>
        <Navbar color={"rgb(30 33 37)"} />
        <div className='landing' >
            <div className="dark-overlay">
                <div id="landing-heading">
                    _Codemate_
                </div>
                <div id="landing-heading-small">
                    An Online Code Editor Made for Programming and Development Purposes
                </div>

                <div className="landing-btns">
                    <Link to="/programming_mode">Programming Mode</Link>
                    <Link to="/development_mode">Development Mode</Link>

                </div>

            </div>
        </div>
    </div>;
}

export default Landing;
