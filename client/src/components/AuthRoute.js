import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function AuthRoute (props) {
  const {
    component: Component, isAuthenticated = false, ...restProps
  } = props;

  return (
    <Route
      {...restProps}
      render={
        props => isAuthenticated ? ( <Component {...props} /> ) : ( <Redirect to="/" /> )
      }
    />
  )
}

export default AuthRoute;
