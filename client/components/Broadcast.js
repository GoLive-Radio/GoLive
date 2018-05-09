import React, { Component } from 'react';
import io from 'socket.io-client';
window.io = io;
import RTCMultiConnection from 'rtcmulticonnection-v3';
import { connect } from 'react-redux';
import MediaElement from './MediaElement';

const mapState = state => ({
  broadcast: state.broadcast
});

export class Broadcast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: null
    };
    this.startBroadcast = this.startBroadcast.bind(this);
  }

  startBroadcast(id) {
    this.connection = new window.RTCMultiConnection();
    this.connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

    //session setup
    this.connection.session = {
      audio: true,
      video: false,
      oneway: true
    };

    //make sure I also don't see the video
    this.connection.mediaConstraints.video = false;
    this.connection.autoCreateMediaElement = false;

    // append it to the body
    this.connection.onstream = event => {
      this.setState({event});
    };
    this.connection.openOrJoin(id);
  }

  render() {

    const myID = this.props.match.params.broadcastId;
    return (
      <div id="container">
        <h1>This is my test broadcast</h1>
        {myID ? (
          <button onClick={ () => this.startBroadcast(myID)}>Broadcast me</button>
        ) : null}
        {
          this.state.event ?
            <MediaElement event={this.state.event} />
            : null
          }
      </div>
    );
  }
}

export default connect(mapState)(Broadcast);
