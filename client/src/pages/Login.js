import * as React from 'react';
import { useState } from 'react';
// import { Link } from 'react-router-dom';

// import { NavigationPanel, NavLink } from '../components/styles/Nav.style';
import { CenteredColContainer, CenteredRowContainer } from '../components/styles/SSOT.style';
import { gql } from '../utils/gql';

const Login = () => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const handleUserInput = (e) => {
        setUser(e.target.value);
    }

    const handlePasswordInput = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async () => {
        try {
            const r = await gql(` { login(user: "${user}", password: "${password}") } `);
            if (r.login === user) console.log("Success!");
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <CenteredColContainer>
            <CenteredRowContainer>
                <input type="text" onChange={handleUserInput}></input>
                <input type="password" onChange={handlePasswordInput}></input>
                <input type="submit" onClick={handleSubmit}></input>
            </CenteredRowContainer>
        </CenteredColContainer>
    )
}

export default Login;