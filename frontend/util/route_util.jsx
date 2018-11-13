import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';

const Auth = ( { component: Component, path, exact, loggedIn}) => (
  <Route path={path} exact={exact} render={(props) => (
      loggedIn ? (
        <Redirect to="/" />
      ) : (
        <Component {...props} />
      )
    )} />
);

const Protected = ( { component: Component, path, exact, loggedIn}) => (
  <Route path={path} exact={exact} render={(props) => (
      loggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    )} />
);

const mapStateToProps = state => ({
  loggedIn: Boolean(state.session.currentUserId)
});

export const AuthRoute = withRouter(connect(mapStateToProps, null)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
