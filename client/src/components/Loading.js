import * as React from 'react';

import Spinner from "../svg/spinner.svg";
import { CenteredColContainer, HeadlineOne } from './styles/SSOT.style';
import { LoadingSpinner } from './styles/Loading.style';

const Loading = (props) => {
    return (
        <CenteredColContainer>
            <HeadlineOne>Loading...</HeadlineOne>
            <LoadingSpinner src={Spinner} alt="Spinner Bicycle Wheel" />
        </CenteredColContainer>
    )
}

export default Loading;