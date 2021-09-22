import styled from 'styled-components';

import { font } from './SSOT.style';

export const GamePlayImg = styled.img`
    height: 50vh;
`;

export const HowToPlayList = styled.ul`
    font-family: ${font};
    font-size: 1em;
    text-align: center;
    list-style-type: none;
`;

export const ListItem = styled.li`
    padding: 0.15em;

    &:before {
        content: "-";
        padding: 0.1em;
    }

    &:after {
        content: "-";
        padding: 0.1em;
    }
`;

export const StartGameButton = styled.button`
    position: relative;
    overflow: hidden;
    transform: translateZ(0);
    display: grid;
    place-items: center;
    height: 64px;
    padding: 0 32px;
    border: 0;
    border-radius: 10px;
    font-family: ${font};
    font-size: 18px;
    color: #ffffff;
    cursor: pointer;

    &:before {
        content: "";
        position: absolute;
        z-index: 1;
        top: 0;
        left: -100%;
        width: 300%;
        height: 100%;
        background: #8f44fd

        repeating-linear-gradient(
        60deg,
            transparent,
            transparent 10px,
            #7a3bd7 10px,
            #7a3bd7 20px
        );
  
        animation: loading 1s infinite linear;

        @keyframes loading {
            0% { transform: translateX(25px); }
            100% { transform: translateX(-20px); }
        }
    }
`;

export const StartGameButtonTitle = styled.span`
    position: relative;
    z-index: 2;
`;