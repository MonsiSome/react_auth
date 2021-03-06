import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({
    isAuthorized,
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={(props) => (
        !!isAuthorized ? (
            <div>
                <Component {...props} />
            </div>
        ): (
            <Redirect to="/" />
        )
    )} />
)