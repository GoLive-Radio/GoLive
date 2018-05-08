import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import Visualizer from './Visualizer';

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
