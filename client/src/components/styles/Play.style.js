import styled from 'styled-components';
import { font } from './SSOT.style';

export const Button = styled.button`
    font-family: ${font};
    color: black;
    font-size: 1.2em;
    font-weight: 400;
    text-align: center;
    padding: 0.25em;
    width: 75%;
    background-color: white;
    border: 1px solid black;
    border-radius: 0.5em;

    &:hover{
        cursor: pointer;
    }
`;

export const AnswerDiv = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 1em;
    margin-bottom: 1em;
    width: 100%;
`;

export const PartImg = styled.img`
    height: 45vh;
    border-radius: 1em;
    border: 1px solid black;
    margin: 0.25em;
`;

export const PhotoContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;

export const Feedback = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const P = styled.p`
    font-family: ${font};
`;