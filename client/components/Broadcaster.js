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
      title: '',
      // recording: false
    };
    // this.toggleRecord = this.toggleRecord.bind(this);
  }

  // toggleRecord(){
  //   this.setState({recording: !this.state.recording});
  // }

  render(){
    return (
      <div>
        <div className="top-bar">
          <h1>{this.state.title}</h1>
          <Button size="mini" color="blue">Edit Title</Button>
        </div>
        {/* <div className="media">
          <div className="ui tiny image">
            <img onClick={this.toggleRecord} src={this.state.recording ? '/images/record_on.png' : '/images/record.png'} />
          </div> */}
          <Visualizer />
        {/* </div> */}
      </div>
    );
  }
}
