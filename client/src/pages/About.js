import * as React from 'react';

import Nav from '../components/Nav';

import { CenteredColContainer, Para } from '../components/styles/SSOT.style';

const Home = () => {
    return (
        <CenteredColContainer>
            <Nav />
            <Para>This game was created by <a href="mailto:lucasmace4130@gmail.com">Lucas Mace</a>,
            a bike nerd, for other bike nerds.</Para>
        </CenteredColContainer>
    )
}

export default Home;