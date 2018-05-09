import React, { Fragment } from 'react';
import {connect} from 'react-redux';
import { Button, TextArea, Form } from 'semantic-ui-react';

const MyAccount = ({user}) => {
  return (
    <Fragment>
      <h1>My account</h1>
      <Form>
        <Form.Field>
          <label>Profile picture</label>
          <input placeholder={user.profilePic} />
        </Form.Field>
        <Form.Field>
          <label>Tell us more about yourself</label>
          <TextArea placeholder={user.summary} />
        </Form.Field>
        <Form.Field
          control={Button} content="Save" label="Save" />
      </Form>
    </Fragment>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  };
};

export default connect(mapState)(MyAccount);

