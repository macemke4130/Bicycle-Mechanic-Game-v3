import styled from 'styled-components'
import { font } from './SSOT.style';

export const HighScoreDiv = styled.div`
    display: flex;
    justify-content: space-between;
    font-family: ${font};
    margin: 0;
    padding: 0.5em;
    background-color: lightgray;
    text-align: center;

    &:nth-of-type(even) {
        background-color: white;
    }
`;

export const HighScoreTitleDiv = styled.div`
    display: flex;
    justify-content: space-between;
    font-family: ${font};
    margin: 0;
    padding: 0.5em;
    background-color: white;
    text-align: center;
`;

export const Name = styled.span`
    display: flex;
    justify-content: flex-start;
    width: 33.3%;
`;

export const TotalScore = styled.span`
    display: flex;
    justify-content: center;
`;

export const ScoreDate = styled.span`
    display: flex;
    justify-content: flex-end;
    width: 33.3%;
`;

export const YouAreWinner = styled.div`
    animation-name: Animate-In;
    animation-duration: 1s;
    animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
    font-size: 2em;

    @keyframes Animate-In {
        0%   {font-size: 0.1em;}
        90% {font-size: 2.5em;}
        100% {font-size: 2em;}
    }
`;

export const YouAreLoser = styled.div`
    animation-name: Animate-In;
    animation-duration: 1s;
    animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
    font-size: 2em;

    @keyframes Animate-In {
        0%   {font-size: 0.1em;}
        90% {font-size: 2.5em;}
        100% {font-size: 2em;}
    }
`;