import * as React from 'react';
import { useEffect, useState } from 'react';

import Loading from './Loading';
import { HighScoreDiv, Name, TotalScore, ScoreDate } from './styles/ScoreBoard.style';

import { gql } from '../utils/gql';

const Scoreboard = () => {
    const [loading, setLoading] = useState(true);
    const [flag, setFlag] = useState(true);
    const [highScores, setHighscores] = useState([]);

    const getHighScores = async () => {
        setFlag(false);
        const r = await gql(`{ highscores { id, name, totalscore, club100, club100num, scoredate } }`);
        setHighscores(r.highscores);
        setLoading(false);
    }

    useEffect(() => {
        if (flag) getHighScores();
    })

    if (loading) return <Loading />;

    return (
        <>
            <HighScoreDiv>
                <Name>Name</Name>
                <TotalScore>Total Score</TotalScore>
                <ScoreDate>Date</ScoreDate>
            </HighScoreDiv>
            {
                highScores?.map(score => (
                    <HighScoreDiv key={score.id}>
                        <Name>{score.name}</Name>
                        <TotalScore>{score.totalscore}</TotalScore>
                        <ScoreDate>{score.scoredate}</ScoreDate>
                    </HighScoreDiv>
                ))
            }
        </>
    )
}

export default Scoreboard;