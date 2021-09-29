import * as React from 'react';

import { Para } from './styles/SSOT.style';
import { InputName } from './styles/ScoreBoard.style';

const InputHighScore = (props) => {
    
    const handleName = (e) => {
       props.setWinnerName(e.target.value);
    }

    return (
        <>
            <Para>You're in the top ten high scores!</Para>
            <Para>Enter your name.</Para>
            <InputName type="text" id="name" size="30" maxLength="25" onChange={handleName} autoComplete="off"></InputName>
            <button onClick={props.submitHighScoreName}>Submit</button>
        </>
    )
}

export default InputHighScore;