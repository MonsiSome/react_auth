import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({
    isAuthorized, 
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={(props) => (
        !!isAuthorized ? (
            <Redirect to='/profile' />           
        ): (
            <Component {...props} />
        )
    )} />
)
