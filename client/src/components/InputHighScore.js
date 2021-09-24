import * as React from 'react';

const InputHighScore = (props) => {
    
    const handleName = (e) => {
       props.setWinnerName(e.target.value);
    }

    return (
        <>
            <p>You're in the top ten high scores!</p>
            <p>Enter your name.</p>
            <input type="text" id="name" col={50} onChange={handleName} autoComplete="off"></input>
            <button onClick={props.submitHighScoreName}>Submit</button>
        </>
    )
}

export default InputHighScore;