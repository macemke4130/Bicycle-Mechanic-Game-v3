import * as React from 'react';
import { Link } from 'react-router-dom';

import { NavigationPanel, NavLink } from '../components/styles/Nav.style';
import { CenteredColContainer, Para } from '../components/styles/SSOT.style';

const Home = () => {
    return (
        <CenteredColContainer>
            <NavigationPanel>
                <Link to="/" style={{ textDecoration: 'none' }}><NavLink>Home</NavLink></Link>
                <Link to="/play" style={{ textDecoration: 'none' }}><NavLink>Play</NavLink></Link>
                <Link to="/scoreboard" style={{ textDecoration: 'none' }}><NavLink>Scoreboard</NavLink></Link>
            </NavigationPanel>
            <Para>This game was created by <a href="mailto:lucasmace4130@gmail.com">Lucas Mace</a>,
                a bike nerd, for other bike nerds.</Para>
        </CenteredColContainer>
    )
}

export default Home;