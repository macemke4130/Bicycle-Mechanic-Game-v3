import React from 'react'
import { useState, useEffect } from 'react';

import { P } from './styles/Play.style';

const Timer = (props) => {
    const [insidePoints, setInsidePoints] = useState(props.points);

    // useEffect(()=>{
    // let myInterval = setInterval(() => {
    //         setInsidePoints(insidePoints => insidePoints - 25);
    //         if(props.resetTimer) setInsidePoints(500);
    //         props.updatePoints(insidePoints);
    //     }, 1000)
    //     return ()=> {
    //         clearInterval(myInterval);
    //       };
    // });

    return (
        <P>Points Remaining: {insidePoints}</P>
    )
}

export default Timer;