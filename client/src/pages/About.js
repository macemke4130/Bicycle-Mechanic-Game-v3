import * as React from 'react';
import { Link } from 'react-router-dom';

import { NavigationPanel, NavLink } from '../components/styles/Nav.style';
import { CenteredColContainer, Para } from '../components/styles/SSOT.style';

const About = () => {
    return (
        <CenteredColContainer>
            <NavigationPanel>
                <Link to="/" style={{ textDecoration: 'none' }}><NavLink>Home</NavLink></Link>
                <Link to="/play" style={{ textDecoration: 'none' }}><NavLink>Play</NavLink></Link>
                <Link to="/scoreboard" style={{ textDecoration: 'none' }}><NavLink>Scoreboard</NavLink></Link>
            </NavigationPanel>
            <Para>This game was created by me <a href="http://www.lucasmace.com/" target="_blank" rel="noreferrer">Lucas Mace</a>,
                a bicycle nerd, for other bicycle nerds.</Para>
            <Para>I was a bicycle mechanic for over 10 years. In that time, my favorite game that
                I used to played with my many co-workers had been handing them a small part and telling them to
                "Name this part." If the first mechanic couldn't get it, the next would want to try. Then, we'd
                all probably play for the rest of the day.</Para>
            <Para>I work professionally as a web developer and I knew that I could recreate this fun into an internet game
                that people would want to play. For this project I chose to build with React, GraphQL, MySQL, Express and Styled Components.</Para>
            <Para>This project has already gone through a rigourus prototype and beta testing phase,
                but if you find an error or bug along the way, please email
                me <a href="mailto:lucasmace4130@gmail.com">here</a> and I will try to take care of it.
                All photos are taken by me and I try to add parts to the game every week. So if you'd like
                to keep your high score, check back often.
            </Para>
            <Para>This project has also been fact checked. If you think that a part is mislabled or that you should
                have gotten a correct answer, look it up before emailing me.
            </Para>
            <Para>If you'd like to use this game as an interview tool or use your high score on
                your resume, please go right ahead!
            </Para>
            <Para>If you enjoy the game, please share it with your bicycle nerd friends.</Para>
            <Para>This project is funded completely by myself and maintained in my spare time.</Para>
            <Para>- Lucas</Para>

        </CenteredColContainer>
    )
}

export default About;