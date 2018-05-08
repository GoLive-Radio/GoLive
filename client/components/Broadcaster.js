import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import Visualizer from './Visualizer';

// const mapState = state => {

// };

// const mapDispatch = dispatch => {

// };

export default class Broadcaster extends Component{
  constructor(props){
    super(props);
    this.state = {
      title: 'Music for the Soul',
    };
  }

  render(){
    return (
      <div>
        <div className="top-bar">
          <h1>{this.state.title}</h1>
          <Button size="mini" color="blue">Edit Title</Button>
        </div>
          <Visualizer />
      </div>
    );
  }
}
