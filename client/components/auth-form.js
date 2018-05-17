import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {auth} from '../store';
import { Button, TextArea, Form } from 'semantic-ui-react';

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {name, displayName, handleSubmit, error} = props;

  return (
    <div className="login-container flex">
      <Form id="login" onSubmit={handleSubmit} name={name}>
        <h1 className="white-font shadow">{displayName}</h1>
        <Form.Field>
          <label>Email</label>
          <input name="email" type="text" />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input name="password" />
        </Form.Field>
        <Form.Field control={Button} content={displayName} />
        {error && error.response && <div> {error.response.data} </div>}
      </Form>
        {/*<a href="/auth/google">{displayName} with Google</a> */}
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  };
};

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(auth(email, password, formName));
    }
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
};
