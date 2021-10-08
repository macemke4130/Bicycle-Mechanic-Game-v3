import React from 'react'
import { useState, useEffect } from 'react';

import { P } from './styles/Play.style';

const Timer = (props) => {
    const [totalGameSeconds, setTotalGameSeconds] = useState(0);

    useEffect(() => {
        let pointsTimer = setInterval(() => {
            setInsidePoints(insidePoints => insidePoints - props.pointDrop);
            if (props.resetTimer) setInsidePoints(500);
            props.updatePoints(insidePoints);
        }, 1000)
        
        return () => {
            clearInterval(pointsTimer);
        };
    });

    return (
        <P>Points Remaining: {insidePoints}</P>
    )
}

export default Timer;