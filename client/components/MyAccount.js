import React, { Fragment } from 'react';
import {connect} from 'react-redux';
import { Button, Checkbox, Form } from 'semantic-ui-react';

const MyAccount = ({user}) => {
  console.log(user);
  return (
    <Form>
      <Form.Field>
        <label>Profile picture</label>
        <input placeholder={user.profilePic} />
      </Form.Field>
      <Form.Field>
        <label>Summary</label>
        <input placeholder={user.summary} />
      </Form.Field>
    </Form>
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

