import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { CenteredColContainer, CenteredRowContainer, HeadlineOne, Para } from '../components/styles/SSOT.style';
import { HowToPlayList, ListItem, StartGameButton, StartGameButtonTitle } from '../components/styles/Home.style';
import { PhotoContainer, PartImg } from '../components/styles/Play.style';
import { NavLink } from '../components/styles/Nav.style';

import { gql } from '../utils/gql';
import Loading from '../components/Loading';

const images = require.context('../../public/images', true);

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [gateOpen, setGateOpen] = useState(true);
    const [partCount, setPartCount] = useState(null);
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        (async () => {
            if (gateOpen) {
                try {
                    setGateOpen(false);

                    const partIdToFetch = 6; // Rotor Lock Washer --

                    const r = await gql(` { photo (part_id: ${partIdToFetch}) { id, filename } } `);

                    let formattedPhotos = [];
                    for (let i = 0; i < r.photo.length; i++) {
                        let myObject = { id: null, filename: null };
                        const myPic = images(`./${r.photo[i].filename}.jpg`);
                        myObject.id = r.photo[i].id;
                        myObject.filename = myPic.default;
                        formattedPhotos[i] = myObject;
                    }
                    setPhotos(formattedPhotos);
                    getTotalParts();
                    setLoading(false);
                } catch (e) {
                    console.error(e);
                }
            }
        })()
    });

    const getTotalParts = async () => {
        const r = await gql(` { partCount } `);
        setPartCount(r.partCount);
    }

    if (loading) return <Loading />

    return (
        <CenteredColContainer>
            <HeadlineOne>Name That Part!</HeadlineOne>
            <PhotoContainer>
                {photos?.map(photo => (
                    <PartImg key={photo.id} src={photo.filename} alt="Part" />
                ))}
            </PhotoContainer>
            <HowToPlayList>
                <ListItem>Choose the part from the supplied options based on the photos you see</ListItem>
                <ListItem>You have 20 seconds to make your choice</ListItem>
                <ListItem>Points start at 500 and go down the longer you take to choose</ListItem>
                <ListItem>If the points reach zero, game over</ListItem>
                <ListItem>A correct answer will add the remaining points to your total score and load the next part</ListItem>
                <ListItem>An incorrect answer will end the game</ListItem>
                <ListItem>Have fun and try to beat your friend's score!</ListItem>
            </HowToPlayList>
            {partCount && <Para>There are currently {partCount} parts in the game and I add more every week.</Para>}
            <CenteredRowContainer>
                <Link to="/scoreboard" style={{ textDecoration: 'none' }}><NavLink>Scoreboard</NavLink></Link>
                <Link to="/play" style={{ textDecoration: 'none' }}>
                    <StartGameButton><StartGameButtonTitle>Start Game!</StartGameButtonTitle></StartGameButton>
                </Link>
                <Link to="/about" style={{ textDecoration: 'none' }}><NavLink>About</NavLink></Link>
            </CenteredRowContainer>
        </CenteredColContainer>
    )
}

export default Home;