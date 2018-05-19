import React, {Component} from 'react';
import { ReactMic } from 'react-mic';

export default class Visualizer extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isLive: false
    }
 
  }
 
  componentWillReceiveProps(){
    this.setState({isLive: this.props.isLive})
  }

  onStop(recordedBlob) {
    console.log('recordedBlob is: ', recordedBlob);
  }
 
  render() {
    
    return (
      <div>
        <ReactMic
          record={this.props.isLive}
          className="sound-bar"
          onStop={this.onStop}
          strokeColor="#00CCFF"
          backgroundColor="#00323d"
          audioBitsPerSecond={6000}
           />

      </div>
    );
  }
}
