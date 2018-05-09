import React, { Component, Fragment } from 'react';
import io from 'socket.io-client';
window.io = io;
import RTCMultiConnection from 'rtcmulticonnection-v3';
import { connect } from 'react-redux';
import MediaElement from './MediaElement';
import Broadcaster from './Broadcaster';

const mapState = state => ({
  broadcast: state.broadcast
});

// const mapDispatch = dispatch => ({

// });

export class Broadcast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: null,
      src: null,
      element: null
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
      console.log('the event ', event)
      console.log('stream object', event.stream)
      this.setState({event});
    };
    this.connection.openOrJoin(id);
    console.log('connection ', this.connection)
  }

  render() {
    const myID = this.props.match.params.broadcastId;
    console.log('render event', this.state.event)
    return (
      <div id="container">
        <h1>This is my test broadcast</h1>
        {myID ? (
          <button onClick={ () => this.startBroadcast(myID)}>Broadcast me</button>
        ) : null}
        {
          this.state.event ?
            <Fragment>
              {/* <audio
                id="stream"
                autoPlay={true}
                playsInline={true}
                controls={true}
                muted={true}
                ref={(element) => {
                  if (element){
                    element.srcObject = this.state.event.stream;
                    this.setState({element});
                  }
                }}
              /> */}
              <MediaElement event={this.state.event} />
              {/* <Broadcaster element={this.state.element} /> */}
            </Fragment>
            : null
          }
      </div>
    );
  }
}

export default connect(mapState)(Broadcast);
