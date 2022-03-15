import * as React from 'react';

import Spinner from "../svg/spinner.svg";
import { CenteredColContainer, HeadlineOne, CenterPara } from './styles/SSOT.style';
import { LoadingSpinner } from './styles/Loading.style';

const Loading = (props) => {
    return (
        <CenteredColContainer>
            <HeadlineOne>Loading...</HeadlineOne>
            <LoadingSpinner src={Spinner} alt="Spinner Bicycle Wheel" />
            <CenterPara>If the wheel just keeps on spinning, the server is overloaded. Please try again in about 30 minutes.</CenterPara>
        </CenteredColContainer>
    )
}

export default Loading;