import React, { Fragment } from 'react';
import {connect} from 'react-redux';
import { Button, TextArea, Form } from 'semantic-ui-react';
import { updateUserThunk } from '../store';

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    handleSubmit(evt, user) {
      evt.preventDefault();
      const action = updateUserThunk({
        profilePic: evt.target.picture.value,
        summary: evt.target.summary.value
      }, user);
      dispatch(action);
    }
  };
};

const MyAccount = (props) => {
  return (
    <div className="my-account flex">
      <Form id="my_account" onSubmit={(evt) => props.handleSubmit(evt, props.user)}>
        <h1 className="white-font shadow">My account</h1>
        <Form.Field>
          <label>Profile picture</label>
          <input
            name="picture"
            placeholder={props.user.profilePic} />
        </Form.Field>
        <Form.Field>
          <label>Tell us more about yourself</label>
          <TextArea
            name="summary"
            placeholder={props.user.summary} />
        </Form.Field>
        <Form.Field
          control={Button} content="Save" />
      </Form>
    </div>
  );
};

export default connect(mapState, mapDispatchToProps)(MyAccount);

