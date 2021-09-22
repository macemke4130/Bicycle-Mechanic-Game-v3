import * as React from 'react';
import { Link } from 'react-router-dom';

const Nav = (props) => {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/play">Play</Link>
            <Link to="/scoreboard">Scoreboard</Link>
            <Link to="/about">About</Link>
        </nav>
    )
}

export default Nav;