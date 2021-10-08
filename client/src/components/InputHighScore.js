import * as React from 'react';

import { CenterPara } from './styles/SSOT.style';
import { InputName } from './styles/ScoreBoard.style';

const InputHighScore = (props) => {

    const handleName = (e) => {
       props.setWinnerName(e.target.value);
    }

    return (
        <>
            <CenterPara>You're in the top ten high scores!</CenterPara>
            <InputName type="text" id="name" size="30" maxLength="25" onChange={handleName} placeholder="Enter your name" autoComplete="off"></InputName>
            <button onClick={props.submitHighScoreName}>Submit</button>
        </>
    )
}

export default InputHighScore;