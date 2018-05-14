import React, { Component } from 'react';
import io from 'socket.io-client';
window.io = io;
import RTCMultiConnection from 'rtcmulticonnection-v3';
import { connect } from 'react-redux';
import MediaElement from './MediaElement';
import { Image } from 'semantic-ui-react';
import CasterMini from './CasterMini';
import { updateBroadcastThunk, fetchBroadcast } from '../store/broadcast';
import axios from 'axios';

const fakeUsers = [
  {
    id: 1,
    fullName: 'Geoff Bass',
    broadcastRating: 5,
    callerRating: 5,
    imageUrl: '/images/fakeData/Geoff.jpeg',
    isBroadcasting: true,
    isCalling: false
  },
  {
    id: 2,
    fullName: 'Omri Bernstein',
    broadcastRating: 5,
    callerRating: 5,
    imageUrl: '/images/fakeData/omri.png',
    isBroadcasting: false,
    isCalling: true
  },
  {
    id: 3,
    fullName: 'Corey Greenwald',
    broadcastRating: 5,
    callerRating: 3,
    imageUrl: '/images/fakeData/Corey.jpg',
    isBroadcasting: false,
    isCalling: true
  },
  {
    id: 4,
    fullName: 'Karen MacPherson',
    broadcastRating: 5,
    callerRating: 5,
    imageUrl: '/images/fakeData/karen.jpeg',
    isBroadcasting: false,
    isCalling: true
  },
  {
    id: 5,
    fullName: "Scott D'Alessandro",
    broadcastRating: 4,
    callerRating: 5,
    imageUrl: '/images/fakeData/scott.jpg',
    isBroadcasting: true,
    isCalling: false
  }
];

const fakeBroadcast = {
  title: 'AwesomeCast',
  broadcasters: 2,
  listeners: 3
};

class Broadcast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: null,
      recording: false,
      isLive: false,
      mediaRecorder: null
    };
    this.startBroadcast = this.startBroadcast.bind(this);
  }

  componentDidMount() {
    this.props.loadBroadcast();
  }

  startBroadcast(id) {
    if (!this.connection) {
      this.connection = new window.RTCMultiConnection();
      this.connection.socketURL =
        'https://rtcmulticonnection.herokuapp.com:443/';

      // is this setState necessary? it's happening again on ln 129
      this.setState({
        isLive: true
      });
      //session setup
      this.connection.session = {
        audio: true,
        video: false,
        oneway: true
      };
      
      // close out all connections when host leaves
      this.connection.autoCloseEntireSession = true;


      //make sure I also don't see the video
      this.connection.mediaConstraints.video = false;
      this.connection.autoCreateMediaElement = false;

      // append it to the body
      this.connection.onstream = event => {
        let mediaRecorder = new MediaRecorder(event.stream, {
          mimeType: 'audio/webm'
        });
        let chunks = [];
        mediaRecorder.ondataavailable = e => {
          console.log(`e.data: `, e.data);
          chunks.push(e.data);
        };
        mediaRecorder.onstop = e => {
          /*
          This event fires when the recording has stopped. We can then collect the recorded data and convert it to FormData so that it can be sent to our backend.
          */
          let blob = new Blob(chunks, { type: 'audio/ogg' });
          console.log(`blob`, blob);
          let formData = new FormData();
          formData.append('blob', blob);
          this.props.sendRecordingToDB(formData, {
            id: this.props.match.params.broadcastId
          });
        };
        this.setState({
          isLive: true,
          event,
          recording: true,
          mediaRecorder
        });
        mediaRecorder.start();
      };

      // update db with broadcast status
      axios.put(`/api/broadcasts/${this.props.match.params.broadcastId}/is-live`, {isLive: true});
      this.connection.openOrJoin(id);
      
    } else {
      // this code will execute when broadcast is being stopped.
      axios.put(`/api/broadcasts/${this.props.match.params.broadcastId}/is-live`, {isLive: false});
      this.setState({
        isLive: false
      });
      this.state.mediaRecorder.stop();
      console.log(`mediaRecorder.state: `, this.state.mediaRecorder.state);
      console.log(`this.state: `, this.state);
      this.connection.disconnect();
    }
  }

  render() {
    //filter data for propagation in list components
    const broadcasters = fakeUsers.filter(user => {
      if (user.isBroadcasting) return user;
    });

    const callers = fakeUsers.filter(user => {
      if (user.isCalling) return user;
    });

    const { broadcast } = this.props;
    const myID = this.props.match.params.broadcastId;

    return (
      <div id="broadcast">
        <h1 id="broadcast-title">{broadcast.name}</h1>
        <h4 id="broadcast-desc">{broadcast.description}</h4>
        {
          //check here to make sure the user is the broadcaster
          <div id="broadcast-dash">
            <div id="user-lists">
              <div id="broadcaster-list">
                <h1>Broadcasters</h1>
                {broadcasters.map(user => {
                  return (
                    <CasterMini
                      key={user.id}
                      user={user}
                      rate={'broadcaster'}
                    />
                  );
                })}
              </div>
              <div id="broadcaster-list">
                <h1>Call Queue</h1>
                {callers.map(user => {
                  return (
                    <CasterMini key={user.id} user={user} rate={'caller'} />
                  );
                })}
              </div>
            </div>
            <div id="live-button">
              {myID ? (
                <Image
                  size="small"
                  onClick={() => this.startBroadcast(myID)}
                  src={
                    this.state.isLive
                      ? '/images/record_on.png'
                      : '/images/record.png'
                  }
                />
              ) : null}
            </div>
          </div>
        }
        {this.state.event ? <MediaElement type="broadcaster" event={this.state.event} /> : null}
      </div>
    );
  }
}

const mapState = state => ({
  broadcast: state.broadcast
});

const mapDispatch = (dispatch, ownProps) => {
  return {
    sendRecordingToDB(broadcastData, broadcast) {
      dispatch(updateBroadcastThunk(broadcastData, broadcast));
    },
    loadBroadcast() {
      dispatch(fetchBroadcast(ownProps.match.params.broadcastId));
    }
  };
};

export default connect(mapState, mapDispatch)(Broadcast);
