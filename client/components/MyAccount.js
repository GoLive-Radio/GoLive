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
    <Fragment>
      <h1>My account</h1>
      <Form onSubmit={(evt) => props.handleSubmit(evt, props.user)}>
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
          control={Button} content="Save" label="Save" />
      </Form>
    </Fragment>
  );
};

export default connect(mapState, mapDispatchToProps)(MyAccount);

