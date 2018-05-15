import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
window.io = io;
import RTCMultiConnection from 'rtcmulticonnection-v3';
import { connect } from 'react-redux';
import MediaElement from './MediaElement';
import { Image, Button } from 'semantic-ui-react';
import CasterMini from './CasterMini';
import Visualizer from './Visualizer'
import { updateBroadcastThunk, fetchBroadcast } from '../store/broadcast';
import axios from 'axios';

const fakeUsers = [
  {
    id: 1,
    userName: 'Geoff Bass',
    broadcastRating: 5,
    callerRating: 5,
    profilePic: '/images/fakeData/Geoff.jpeg',
    isBroadcasting: true,
    isCalling: false
  },
  {
    id: 2,
    userName: 'Omri Bernstein',
    broadcastRating: 5,
    callerRating: 5,
    profilePic: '/images/fakeData/omri.png',
    isBroadcasting: false,
    isCalling: true
  },
  {
    id: 3,
    userName: 'Corey Greenwald',
    broadcastRating: 5,
    callerRating: 3,
    profilePic: '/images/fakeData/Corey.jpg',
    isBroadcasting: false,
    isCalling: true
  },
  {
    id: 4,
    userName: 'Karen MacPherson',
    broadcastRating: 5,
    callerRating: 5,
    profilePic: '/images/fakeData/karen.jpeg',
    isBroadcasting: false,
    isCalling: true
  },
  {
    id: 5,
    userName: "Scott D'Alessandro",
    broadcastRating: 4,
    callerRating: 5,
    profilePic: '/images/fakeData/scott.jpg',
    isBroadcasting: true,
    isCalling: false
  }
];

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

  componentWillUnmount(){
    this.connection && 
    this.connection.close() && 
    this.connection.disconnect();
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
          chunks.push(e.data);
        };
        mediaRecorder.onstop = e => {
          /*
          This event fires when the recording has stopped. We can then collect the recorded data and convert it to FormData so that it can be sent to our backend.
          */
          let blob = new Blob(chunks, { type: 'audio/ogg' });
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
      this.connection.disconnect();
    }
  }

  render() {
    //filter data for propagation in list components
    let broadcasters;
    const callers = fakeUsers.filter(user => {
      if (user.isCalling) return user;
    });

    if (this.props.broadcast.user){
      broadcasters = [this.props.broadcast.user];
    }
    const { broadcast } = this.props;
    const myID = this.props.match.params.broadcastId;

    console.log(this.props, 'these are the ppropps ///////////')
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
                {broadcasters && broadcasters.map(user => {
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
            <div className="broadcast-mid-content">
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
                  <Visualizer
                    event={this.state.event}
                    isLive={this.state.isLive} />
                  </div>
                  <Button
                    color="blue"
                    disabled={this.state.isLive}
                    as={Link}
                    to={`/stations/${broadcast.stationId}`}
                    id="back-button"
                    content="Back to station"
                    icon="left arrow"
                    labelPosition="left" />
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
