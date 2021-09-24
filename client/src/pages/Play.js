import * as React from 'react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { gql } from '../utils/gql';

import Timer from '../components/Timer';
import Nav from '../components/Nav';
import Scoreboard from '../components/Scoreboard';
import InputHighScore from '../components/InputHighScore';
import Loading from '../components/Loading';
import { Button, AnswerDiv, PartImg, PhotoContainer, Feedback, P } from '../components/styles/Play.style';
import { YouAreWinner, YouAreLoser } from '../components/styles/ScoreBoard.style';
import { HeadlineOne, CenteredColContainer } from '../components/styles/SSOT.style';

const images = require.context('../../public/images', true);

const Play = () => {
    const [loading, setLoading] = useState(true);
    const [flag, setFlag] = useState(true);
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState(false);
    const [highScoreDisplay, setHighScoreDisplay] = useState(true);
    const [allParts, setAllParts] = useState([]);
    const [win, setWin] = useState("");
    const [answers, setAnswers] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [preloadPhotos, setPreloadPhotos] = useState([]);
    const [index, setIndex] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const [points, setPoints] = useState(500);
    const [inTopTen, setInTopTen] = useState(false);
    const [club100, setClub100] = useState(false);
    const [club100num, setClub100num] = useState(0);
    const [scorePass, setScorePass] = useState(null);
    const [resetTimer, setResetTimer] = useState(false);

    const history = useHistory();

    const getAllParts = async () => {
        // Gets all parts and their id in from the database then shuffles them --

        // Prevents multiple fetches --
        setFlag(false);

        try {
            const r = await gql(`{ allParts { id, win } }`);
            const shuffledParts = r.allParts.sort((a, b) => 0.5 - Math.random());
            setAllParts(shuffledParts);
            setClub100num(r.allParts.length);

            // Start Gameplay --
            getPart(r.allParts[index].id);
            setLoading(false);
        } catch (e) {
            console.error(e);
        }
    }

    const getPart = async (x) => {
        // Gets individual part and its photos --

        try {
            const r = await gql(`{ part(id: ${x}) { id win lose1 lose2 lose3 }, photo(part_id: ${x}) { id filename }}`);

            let allPics = [];
            for (let i = 0; i < r.photo.length; i++) {
                // Photo formatting for React import --
                let myObject = { id: null, filename: null };
                const myPic = images(`./${r.photo[i].filename}.jpg`);
                myObject.id = r.photo[i].id;
                myObject.filename = myPic.default;
                allPics[i] = myObject;
            }

            setPhotos(allPics);

            // Setting possible answers and shuffles them --
            const allAnswers = [
                { id: 0, name: r.part.win },
                { id: 1, name: r.part.lose1 },
                { id: 2, name: r.part.lose2 },
                { id: 3, name: r.part.lose3 }
            ];

            const shuffledAnswers = allAnswers.sort((a, b) => 0.5 - Math.random());
            setAnswers(shuffledAnswers);
            setWin(r.part.win);

            if (index === 0) setIndex(1); // Fixes initial load index --
        } catch (e) {
            console.error("Getting Part ID: " + x + " - " + e);
        }
    }

    const getNext = () => {
        // Increments the Index State and calls getPart() --

        setIndex(index + 1);
        const nextPartId = allParts[index].id;
        getPart(nextPartId);
    }

    const handleChoice = (e) => {
        // User selected answer handler --

        const selected = e.target.innerText;

        if (selected === win) {
            setTotalScore(totalScore + points);
            setResetTimer(true);

            if (index === allParts.length) {
                setClub100(true);
                gameWin();
                return;
            }

            setPoints(500);
            getNext();
        } else {
            gameLost();
        }
    }

    const handlePlayAgain = () => {
        history.go(0);
    }

    const updatePoints = (pointsFromTimer) => {
        // Update user's total points and resets timer --

        setPoints(pointsFromTimer);
        setResetTimer(false);
        if (points < 0) gameLost();
    }

    const gameWin = () => {
        // All questions answered correctly --

        setGameOver(true);
        setWinner(true);
        highScoreCheck();
    }

    const gameLost = () => {
        // Time over or wrong answer submitted --

        setGameOver(true);
        highScoreCheck();
    }

    const highScoreCheck = async () => {
        // Checks database to see if user is in the Top 10 high scores --

        const r = await gql(`{ highscores { totalscore } }`);

        if (r.length < 10) {
            if (totalScore > 0) updateHighScore();
        } else {
            const lowestHighScore = r.highscores[r.highscores.length - 1].totalscore;
            if (totalScore > lowestHighScore) updateHighScore();
        }
    }

    const updateHighScore = () => {
        // Passes the top 10 score to the <InputHighScore> component as props --

        const scorePass = {
            totalScore,
            club100,
            club100num
        }
        setScorePass(scorePass);
        setInTopTen(true);
    }

    const refeshHighScore = () => {
        // Refreshes the scoreboard component when user enters their name --
        setInTopTen(false);
        setHighScoreDisplay(false);
        setHighScoreDisplay(true);
    }

    useEffect(() => {
        // Preload next part photos after each correct answer --

        (async () => {
            if (allParts.length > 0) {
                const finalPreload = allParts.length - 2;
                if (index <= finalPreload) {
                    const nextPartId = allParts[index + 1].id;
                    try {
                        const r = await gql(`{ photo(part_id: ${nextPartId}) { id filename } }`);
                        let preloadPics = [];
                        for (let i = 0; i < r.photo.length; i++) {
                            let myObject = { id: null, filename: null };
                            const myPic = images(`./${r.photo[i].filename}.jpg`);
                            myObject.id = r.photo[i].id;
                            myObject.filename = myPic.default;
                            preloadPics[i] = myObject;
                        }
                        setPreloadPhotos(preloadPics);
                    } catch (e) {
                        console.error("Could Not Get Part ID: " + nextPartId);
                        console.error(e);
                    }
                }
            }
        })();
    }, [allParts, index]);

    useEffect(() => {
        // Run Program --

        if (flag) getAllParts();
    });

    const handleCheat = () => {
        setWinner(true);
        setInTopTen(true);
        setTotalScore(10000);
    }

    if (loading) return <Loading />;

    if (gameOver === false) {
        return (
            <> 
            <button onClick={handleCheat}>Cheat</button>
                <PhotoContainer>
                    {photos?.map(photo => (
                        <PartImg key={photo.id} src={photo.filename} alt="Part" />
                    ))}
                </PhotoContainer>
                {answers?.map(answer => (
                    <AnswerDiv key={answer.id}>
                        <Button key={answer.id} onClick={handleChoice}>{answer.name}</Button>
                    </AnswerDiv>
                ))}
                <Feedback>
                    <Timer points={points} updatePoints={updatePoints} resetTimer={resetTimer} />
                    <P>Total Score: {totalScore}</P>
                </Feedback>

                {preloadPhotos?.map(nextPic => (
                    <img key={nextPic.id} src={nextPic.filename} alt="No Display" width="0" />
                ))}
            </>
        )
    }

    if (winner) {
        return (
            <>
                <CenteredColContainer>
                    <YouAreWinner>You Win!</YouAreWinner>
                    <button onClick={handlePlayAgain}>Play Again?</button>
                    <HeadlineOne>Total Score: {totalScore}</HeadlineOne>
                    {inTopTen && <InputHighScore scorePass={scorePass} refeshHighScore={refeshHighScore} />}
                </CenteredColContainer>
                {highScoreDisplay && <Scoreboard refeshHighScore={refeshHighScore} />}
                <Nav />


            </>
        )
    }

    if (gameOver) {
        return (
            <>
                <CenteredColContainer>
                    <YouAreLoser>Game Over</YouAreLoser>
                    <button onClick={handlePlayAgain}>Play Again?</button>
                    <HeadlineOne>Total Score: {totalScore}</HeadlineOne>
                    {inTopTen && <InputHighScore scorePass={scorePass} refeshHighScore={refeshHighScore} />}
                </CenteredColContainer>
                {highScoreDisplay && <Scoreboard refeshHighScore={refeshHighScore} />}
                <Nav />
            </>
        )
    }
}

export default Play;