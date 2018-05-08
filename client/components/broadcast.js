import React, { Component } from 'react';
import io from 'socket.io-client';
window.io = io;
import RTCMultiConnection from 'rtcmulticonnection-v3';

export class Broadcast extends Component {
  constructor(props) {
    super(props);
    this.startBroadcast = this.startBroadcast.bind(this);
  }

  startBroadcast(id) {
    this.connection.openOrJoin(id);
  }

  render() {
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

    //append it to the body
    this.connection.onstream = event => {
      document.body.appendChild(event.mediaElement);
    };

    const myID = this.props.match.params.broadcastId;
    return (
      <div>
        {/* {
          listener ? <Listener caller={isCaller} />
          : <Broadcaster />
        } */}
        <h1>This is my test broadcast</h1>
        {myID ? (
          <button onClick={e => this.startBroadcast(myID)}>Broadcast me</button>
        ) : null}
      </div>
    );
  }
}
