import * as React from 'react';
import { useHistory } from 'react-router';

import { CenteredColContainer } from './styles/SSOT.style';

const LogoutButton = (props) => {
    const history = useHistory();

    const handleLogOut = () => {
        localStorage.removeItem("Token");
        history.push("/");
    }

    return (
        <CenteredColContainer>
            <button onClick={handleLogOut}>Log Out</button>
        </CenteredColContainer>
    )
}

export default LogoutButton;