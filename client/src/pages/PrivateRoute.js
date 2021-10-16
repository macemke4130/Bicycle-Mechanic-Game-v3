import * as React from 'react';
import { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom'
import LogoutButton from '../components/LogoutButton';

import { gql } from '../utils/gql';

const PrivateRoute = ({ children, ...rest }) => {
    const [openGate, setOpenGate] = useState(true);
    const [auth, setAuth] = useState();

    useEffect(() => {
        (async () => {
            if (openGate) {
                setOpenGate(false);

                try {
                    const token = localStorage.getItem("Token");
                    const r = await gql(` { auth(token: "${token}") { valid, user, admin } } `);
                    setAuth(r.auth.valid ? true : false);
                } catch (e) {
                    console.error(e);
                }
            }
        })();
    }, [openGate, auth]);

    if (auth === false) {
        return (
            <Redirect to="/" />
        );
    } else {
        return (
            <Route {...rest}>
                <LogoutButton />
                {children}
            </Route>
        );
    }
};

export default PrivateRoute;