import styled from 'styled-components';

import { font } from './SSOT.style';

export const NavigationPanel = styled.nav`
    display: flex;
    justify-content: space-around;
    width: 80%;
`;

export const NavLink = styled.div`
    font-family: ${font};
    font-size: 1em;
    color: white;
    text-decoration: none;
    background-color: #8f44fd;
    padding: 0.5em;
    border-radius: 0.25em;
`;