import * as React from 'react';
import { Link } from 'react-router-dom';

import { NavigationPanel, NavLink } from "./styles/Nav.style";

const Nav = (props) => {
    return (
        <NavigationPanel>
            <Link to="/" style={{ textDecoration: 'none' }}><NavLink>Home</NavLink></Link>
            <Link to="/play" style={{ textDecoration: 'none' }}><NavLink>Play</NavLink></Link>
            <Link to="/scoreboard" style={{ textDecoration: 'none' }}><NavLink>Scoreboard</NavLink></Link>
            <Link to="/about" style={{ textDecoration: 'none' }}><NavLink>About</NavLink></Link>
        </NavigationPanel>
    )
}

export default Nav;