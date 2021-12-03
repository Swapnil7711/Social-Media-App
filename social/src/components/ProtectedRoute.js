import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: element, isLoggedIn, ...rest }) => {
    return (
        <Route {...rest} render={
            props => {
                if (isLoggedIn) {
                    return <element {...rest} {...props} />
                } else {
                    return <Navigate to={
                        {
                            pathname: '/login',
                            state: {
                                from: props.location
                            }
                        }
                    } />
                }
            }
        } />
    )
}

export default ProtectedRoute;