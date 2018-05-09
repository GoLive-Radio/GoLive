import React, { Component } from 'react';
import {connect} from 'react-redux';

export class MyAccount extends Component {
  constructor(props){
    super(props)

    //bind methods
  }

  render() {
    console.log('props', this.props);
    return(
      <div>
        This is my account
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  };
};

export default connect(mapState)(MyAccount);

