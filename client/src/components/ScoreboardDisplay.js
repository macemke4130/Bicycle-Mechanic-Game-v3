import * as React from 'react';
import { useEffect, useState } from 'react';

import Loading from './Loading';
import { HighScoreTitleDiv, HighScoreDiv, Name, TotalScore, ScoreDate } from './styles/ScoreBoard.style';

import { gql } from '../utils/gql';

const Scoreboard = () => {
    const [loading, setLoading] = useState(true);
    const [flag, setFlag] = useState(true);
    const [highScores, setHighscores] = useState([]);

    const getHighScores = async () => {
        setFlag(false);
        try {
            const r = await gql(`{ highscores { id, name, totalscore, club100, club100num, scoredate } }`);
            setHighscores(r.highscores);
            setLoading(false);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        if (flag) getHighScores();
    })

    if (loading) return <Loading />;

    return (
        <>
            <HighScoreTitleDiv>
                <Name>Name</Name>
                <TotalScore>Total Score</TotalScore>
                <ScoreDate>Date</ScoreDate>
            </HighScoreTitleDiv>
            {
                highScores?.map(score => (
                    <HighScoreDiv key={score.id}>
                        <Name>{score.name}</Name>

                        <TotalScore>{score.totalscore} {score.club100 && ` - 100% at ${score.club100num} parts` }</TotalScore>
                        <ScoreDate>{score.scoredate}</ScoreDate>
                    </HighScoreDiv>
                ))
            }
        </>
    )
}

export default Scoreboard;