import * as React from 'react';
import { Link } from 'react-router-dom';

import ScoreboardDisplay from '../components/ScoreboardDisplay';

import { NavigationPanel, NavLink } from '../components/styles/Nav.style';
import { CenteredColContainer } from '../components/styles/SSOT.style';

const Scoreboard = () => {
    return (
        <>
            <CenteredColContainer>
                <NavigationPanel>
                    <Link to="/" style={{ textDecoration: 'none' }}><NavLink>Home</NavLink></Link>
                    <Link to="/play" style={{ textDecoration: 'none' }}><NavLink>Play</NavLink></Link>
                    <Link to="/about" style={{ textDecoration: 'none' }}><NavLink>About</NavLink></Link>
                </NavigationPanel>
            </CenteredColContainer>
            <ScoreboardDisplay />
        </>
    )
}

export default Scoreboard;