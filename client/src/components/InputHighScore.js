import * as React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom'

import { gql } from '../utils/gql';

const InputHighScore = (props) => {
    const [highScoreName, setHighScoreName] = useState("");

    const history = useHistory();

    const handleName = (e) => {
        setHighScoreName(e.target.value);
    }

    const submitHighScoreName = async () => {
        if (highScoreName !== "") {
            try {
                const r = await gql(` mutation { updateHighScore( 
                    name: "${highScoreName}", 
                    totalScore: ${props.scorePass.totalScore}, 
                    club100: ${props.scorePass.club100}, 
                    club100num: ${props.scorePass.club100num}
                    ) {
                      insertId
                    }
                  }`);
                if (r) props.refeshHighScore();
            } catch (e) {
                console.error(e);
            }
        }
    }

    return (
        <>
            <p>You're in the top ten high scores!</p>
            <p>Enter your name.</p>
            <input type="text" id="name" col={50} onChange={handleName} value={highScoreName} autoComplete="off"></input>
            <button onClick={submitHighScoreName}>Submit</button>
        </>
    )
}

export default InputHighScore;