import * as React from 'react';
import { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import { gql } from '../utils/gql';

import Timer from '../components/Timer';
import ScoreboardDisplay from '../components/ScoreboardDisplay';
import InputHighScore from '../components/InputHighScore';
import Loading from '../components/Loading';

import { Button, AnswerDiv, PartImg, PhotoContainer, Feedback, P } from '../components/styles/Play.style';
import { YouAreWinner, YouAreLoser } from '../components/styles/ScoreBoard.style';
import { HeadlineOne, CenteredColContainer } from '../components/styles/SSOT.style';
import { StartGameButton, StartGameButtonTitle } from '../components/styles/Home.style';
import { NavigationPanel, NavLink } from '../components/styles/Nav.style';

const images = require.context('../../public/images', true);

const Play = () => {
    const [loading, setLoading] = useState(true);
    const [flag, setFlag] = useState(true);
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
    const [resetTimer, setResetTimer] = useState(false);
    const [winnerName, setWinnerName] = useState("");
    const [gamePlay, setGamePlay] = useState(true);

    const [statsGate, setStatsGate] = useState(true);
    const [selectionLost, setSelectionLost] = useState(null);
    const [timeoverLost, setTimeoverLost] = useState(null);
    const [totalGameSeconds, setTotalGameSeconds] = useState(0);
    // const [mouseOverEvents, setMouseOverEvents] = useState(0);

    const pointDrop = 25; // Points that drop per timer interval --

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

    const getPart = async (partIdNumber) => {
        // Gets individual part and its photos --

        try {
            const r = await gql(`{ part(id: ${partIdNumber}) { id win lose1 lose2 lose3 }, photo(part_id: ${partIdNumber}) { id filename }}`);

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
            console.error("Getting Part ID: " + partIdNumber + " - " + e);
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
            gameLost("selection");
        }
    }

    const handlePlayAgain = () => {
        // Refesh page to play again --

        history.go(0);
    }

    const updatePoints = (pointsFromTimer) => {
        // Update user's total points and resets timer --

        setPoints(pointsFromTimer);
        setResetTimer(false);
        if (points <= pointDrop) gameLost("timeover");
    }

    const updateGameSeconds = (secondsFromTimer) => {
        setTotalGameSeconds(secondsFromTimer);
    }

    const gameWin = () => {
        // All questions answered correctly --

        setWinner(true);
        setGamePlay(false);
    }

    const gameLost = (type) => {
        // Time over or wrong answer submitted --

        switch (type) {
            case "timeover":
                setTimeoverLost(true);
                break;
            case "selection":
                setSelectionLost(true);
                break;
            default:
                break;
        }
        setGamePlay(false);
    }

    const refeshHighScore = () => {
        // Refreshes the scoreboard component when user enters their name
        // and unmounts the input field --

        setInTopTen(false);
        setHighScoreDisplay(false);
        setHighScoreDisplay(true);
    }

    const submitHighScoreName = async () => {
        // Inputs new high score to the database --

        const check = validateName();

        if (check) {
            try {
                const r = await gql(` mutation { updateHighScore( 
                        name: "${winnerName}", 
                        totalScore: ${totalScore}, 
                        club100: ${club100}, 
                        club100num: ${club100num}
                        ) {
                          insertId
                        }
                      }`);
                if (r) refeshHighScore();
            } catch (e) {
                console.error(e);
            }
        }
    }

    const validateName = () => {
        // Validates user's name for scoreboard --
        // This could be much cleaner wiht some regex --

        if (winnerName === "") return false;
        if (winnerName === " ") return false;
        if (winnerName === "  ") return false;
        if (winnerName === "   ") return false;
        return true;
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
        // Checks High Scores when gamePlay = false --

        if (gamePlay === false) {
            (async () => {
                try {
                    const r = await gql(`{ highscores { totalscore } }`);

                    if (r.highscores.length < 10) {
                        // If there are fewer than 10 scores --
                        // and the score is greater than zero --

                        if (totalScore > 0) setInTopTen(true);
                    } else {
                        // If the user's totalScore is greater than
                        // the lowest top ten score, show input name field --

                        const lowestHighScore = r.highscores[r.highscores.length - 1].totalscore;
                        if (totalScore >= lowestHighScore) setInTopTen(true);
                    }
                } catch (e) {
                    console.error(e);
                }
            })()
        }
    }, [gamePlay, totalScore]);

    useEffect(() => {
        // Sets stats of game to DB when gameplay ends --

        if (statsGate && gamePlay === false) {
            setStatsGate(false);
            (async () => {
                const correctAnswers = winner ? index : index - 1;
                const answerSpeed = totalGameSeconds / correctAnswers;
                const mouseOverEvents = null; // Placeholder --

                try {
                    const r = await gql(` mutation { 
                setStats(
                    won: ${winner},
                    selectionlost: ${selectionLost},
                    timeoverlost: ${timeoverLost},
                    correctanswers: ${correctAnswers},
                    totalscore: ${totalScore},
                    answerspeed: ${answerSpeed.toFixed(2)},
                    gametimelength: ${totalGameSeconds},
                    mouseoverevents: ${mouseOverEvents}
                ) { insertId } } `);
                if (r) console.log("Try Again!");
                } catch (e) {
                    console.error(e);
                }
            })();
        }
    }, [gamePlay, statsGate, index, selectionLost, timeoverLost, winner, totalScore, totalGameSeconds]);

    useEffect(() => {
        // Run Program --

        if (flag) getAllParts();
    });

    const handleEnterKey = (e) => {
        // Prevents a user from using the Enter key to submit a winning choice --
        e.preventDefault();
    }

    const handleFocus = (e) => {
        // Prevents a user from keeping focus to see the correct answer --
        e.target.blur();
    }

    const handleHover = () => {
        // Counts number of times user mouses over a different selection --
        // setMouseOverEvents(mouseOverEvents + 1);
    }

    if (loading) return <Loading />;

    if (gamePlay) {
        return (
            <>
                <PhotoContainer>
                    {photos?.map(photo => (
                        <PartImg key={photo.id} src={photo.filename} alt="Part" />
                    ))}
                </PhotoContainer>

                {answers?.map(answer => (
                    <AnswerDiv key={answer.id}>
                        <Button key={answer.id} tabIndex="-1" onFocus={handleFocus} onKeyUp={handleEnterKey} onKeyDown={handleEnterKey} onKeyPress={handleEnterKey} onSubmit={handleEnterKey} onClick={handleChoice} onMouseOver={handleHover}>{answer.name}</Button>
                    </AnswerDiv>
                ))}

                <Feedback>
                    <Timer points={points} updatePoints={updatePoints} updateGameSeconds={updateGameSeconds} resetTimer={resetTimer} pointDrop={pointDrop} />
                    <P>Total Score: {totalScore}</P>
                </Feedback>

                {preloadPhotos?.map(nextPic => (
                    <img key={nextPic.id} src={nextPic.filename} alt="No Display" width="0" />
                ))}
            </>
        )
    } else {
        // Game Over --

        return (
            <>
                <CenteredColContainer>
                    <NavigationPanel>
                        <Link to="/" style={{ textDecoration: 'none' }}><NavLink>Home</NavLink></Link>
                        <Link to="/scoreboard" style={{ textDecoration: 'none' }}><NavLink>Scoreboard</NavLink></Link>
                        <Link to="/about" style={{ textDecoration: 'none' }}><NavLink>About</NavLink></Link>
                    </NavigationPanel>
                    {winner ? <YouAreWinner>You Win!</YouAreWinner> : <YouAreLoser>Game Over</YouAreLoser>}
                    <StartGameButton onClick={handlePlayAgain}>
                        <StartGameButtonTitle>Play Again?</StartGameButtonTitle>
                    </StartGameButton>
                    <HeadlineOne>Total Score: {totalScore}</HeadlineOne>
                    {inTopTen && <InputHighScore submitHighScoreName={submitHighScoreName} setWinnerName={setWinnerName} />}
                </CenteredColContainer>
                {highScoreDisplay && <ScoreboardDisplay refeshHighScore={refeshHighScore} />}
            </>
        )
    }
}

export default Play;