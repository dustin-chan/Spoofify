import * as APIUtil from '../util/session_api_util'

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const CLEAR_SESSION_ERRORS = 'CLEAR_SESSION_ERRORS';

export const receiveCurrentUser = currentUser => {

  return ({
      type: RECEIVE_CURRENT_USER,
      currentUser
    });
};

export const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

export const clearErrors = () => {
  return ({
    type: CLEAR_SESSION_ERRORS
  });
};

export const fetchCurrentUser = (user) => dispatch => {
  return (
    APIUtil.fetchCurrentUser(user).then(res => {
        dispatch(receiveCurrentUser(res));
      }
    ));
};

export const signup = user => dispatch => (
  APIUtil.signup(user).then(user => (
    dispatch(receiveCurrentUser(user))
  ), err => {
    return (
      dispatch(receiveErrors(err.responseJSON))
    );
  }
));

export const login = user => dispatch => {
  return (
    APIUtil.login(user).then(user => (
      dispatch(receiveCurrentUser(user))
    ), err => (
      dispatch(receiveErrors(err.responseJSON))
    ))
  );
};

export const logout = () => dispatch => (
  APIUtil.logout().then(user => (
    dispatch(receiveCurrentUser(null))
  ))
);
