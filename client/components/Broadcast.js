import React, { Component } from 'react';
import io from 'socket.io-client';
window.io = io;
import RTCMultiConnection from 'rtcmulticonnection-v3';
import $ from 'jquery';
import { connect } from 'react-redux';
import MediaElement from './MediaElement';
import { Image } from 'semantic-ui-react';
import CasterMini from './CasterMini';
import { updateBroadcastThunk } from '../store/broadcast';

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

  startBroadcast(id) {
    if (!this.connection) {
      this.connection = new window.RTCMultiConnection();
      this.connection.socketURL =
        'https://rtcmulticonnection.herokuapp.com:443/';
      this.setState({
        isLive: true
      });
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
        console.log(`onstream func ran`);
        let mediaRecorder = new MediaRecorder(event.stream, {
          mimeType: 'audio/webm'
        });
        let chunks = [];
        mediaRecorder.ondataavailable = e => {
          console.log(`e.data: `, e.data);
          chunks.push(e.data);
        };
        mediaRecorder.onstop = e => {
          console.log(`chunks: `, chunks);
          let blob = new Blob(chunks, { type: 'audio/ogg' });
          console.log(`blob`, blob);
          let objectURL = URL.createObjectURL(blob);
          console.log(`objectURL: `, objectURL);
          let formData = new FormData();
          formData.append('blob', blob);
          //formData.append('isArchived', true);
          //formData.append('isLive', false);
          const updatedData = {
            //isArchived: true,
            //isLive: false,
            blob
          };
          console.log(`...formData: `, ...formData);
          this.props.sendRecordingToDB(formData, { id: this.props.match.params.broadcastId });
        };
        this.setState({
          isLive: true,
          event,
          recording: true,
          mediaRecorder
        });
        mediaRecorder.start();
      };
      this.connection.openOrJoin(id);
    } else {
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

    //filter data for propegation in list components
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
        <h1 id="broadcast-title">{broadcast.title}</h1>
        {
          //check here to make sure the user is the broadcaster
        <div id="broadcast-dash">
          <div id="user-lists">
            <div id="broadcaster-list">
              <h1>Broadcasters</h1>
              {broadcasters.map(user => {
                return (
                  <CasterMini key={user.id} user={user} rate={'broadcaster'} />
                );
              })}
            </div>
            <div id="broadcaster-list">
              <h1>Call Queue</h1>
              {callers.map(user => {
                return <CasterMini key={user.id} user={user} rate={'caller'} />;
              })}
            </div>
          </div>
          <div id="live-button">
            {myID ? (
              <Image
                size="small"
                onClick={this.startBroadcast}
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
        {this.state.event ? (
          <MediaElement event={this.state.event} />
        ) : null}
      </div>
    );
  }
}

const mapState = state => ({
  broadcast: fakeBroadcast
});

const mapDispatch = dispatch => {
  return {
    sendRecordingToDB (broadcastData, broadcast) {
      console.log(`sendRecordingToDB func ran`);
      console.log(`...broadcastData: `, ...broadcastData);
      console.log(`broadcast: `, broadcast);
      dispatch(updateBroadcastThunk(broadcastData, broadcast));
    }
  };
};

export default connect(mapState, mapDispatch)(Broadcast);
