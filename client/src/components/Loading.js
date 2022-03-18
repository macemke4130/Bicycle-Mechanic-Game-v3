import * as React from 'react';
import { Link } from 'react-router-dom';

import Spinner from "../svg/spinner.svg";
import { CenteredColContainer, HeadlineOne, CenterPara, CreatedBy } from './styles/SSOT.style';
import { LoadingSpinner } from './styles/Loading.style';
import { NavLink } from '../components/styles/Nav.style';

const Loading = (props) => {
    return (
        <>
            <CenteredColContainer>
                <HeadlineOne>Loading...</HeadlineOne>
                <LoadingSpinner src={Spinner} alt="Spinner Bicycle Wheel" />
                <CenterPara>If the wheel just keeps on spinning, the server is overloaded. Please try again in about 30 minutes.</CenterPara>
            </CenteredColContainer>
            <CenteredColContainer>
                <CreatedBy>Created by <a href="http://www.lucasmace.com/" target="_blank" rel="noreferrer">Lucas Mace</a></CreatedBy>
            </CenteredColContainer>
            <CenteredColContainer>
                <Link to="/about" style={{ textDecoration: 'none' }}><NavLink>About</NavLink></Link>
            </CenteredColContainer>
        </>
    )
}

export default Loading;