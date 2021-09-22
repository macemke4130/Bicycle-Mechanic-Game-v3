import * as React from 'react';
import { Link } from 'react-router-dom';

import { CenteredColContainer } from '../components/styles/SSOT.style';
import { GamePlayImg, HowToPlayList, ListItem, StartGameButton, StartGameButtonTitle } from '../components/styles/Home.style';

import GamePlay from '../images/gameplay.jpg';

const Home = () => {
    return (
        <CenteredColContainer>
            <GamePlayImg src={GamePlay} alt="Game Play" />
            <HowToPlayList>
                <ListItem>Choose the part from the supplied options based on the photos you see</ListItem>
                <ListItem>You have 20 seconds to make your choice</ListItem>
                <ListItem>Points start at 500 and go down the longer you take to choose</ListItem>
                <ListItem>If the points reach zero, game over</ListItem>
                <ListItem>A correct answer will add the remaining points to your total score and load the next part</ListItem>
                <ListItem>An incorrect answer will end the game</ListItem>
                <ListItem>Have fun and try to beat your friend's score!</ListItem>
            </HowToPlayList>
            <Link to="/play" style={{ textDecoration: 'none' }}><StartGameButton><StartGameButtonTitle>Start Game!</StartGameButtonTitle></StartGameButton></Link>
        </CenteredColContainer>
    )
}

export default Home;