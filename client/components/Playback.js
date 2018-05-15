import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Image, Card } from 'semantic-ui-react';
import RTCMultiConnection from 'rtcmulticonnection-v3';
import MediaElement from './MediaElement';


class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audioSrc: '',
      event: null,
      broadcast: null
    };
    this.startPlayback = this.startPlayback.bind(this);
  }

  componentWillUnmount(){
    this.connection &&
      this.connection.close() &&
      this.connection.disconnect();
  }

  startPlayback() {
    const { broadcastId } = this.props;

    // retrieves the broadcast. If the broadcast is live, creates a new stream, then connects to the live stream by the live stream's broadcastId. If broadcast is not live, retrieves audio from backend.
    return axios
      .get(`/api/broadcasts/${broadcastId}`)
      .then(res => res.data)
      .then(broadcast => {
        this.setState({broadcast});
        if (broadcast.isLive){
          this.connection = new window.RTCMultiConnection();
          // this line is VERY_important
          this.connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

          this.connection.mediaConstraints.video = false;
          this.connection.autoCreateMediaElement = false;

          // // if you want audio+video conferencing
          this.connection.session = {
            audio: false,
            video: false,
            oneway: true
          };

          this.connection.onstream = event => {
            this.setState({event});
          };

          this.connection.join(broadcastId);

        } else {
          axios.get(`/api/broadcasts/${broadcastId}/playback`)
          .then(res => res.data)
          .then(audio => {
            const blob = new Blob([new Uint8Array(audio.blob.data)], { type: audio.type});
            const audioURL = window.URL.createObjectURL(blob);
            this.setState({
              audioSrc: audioURL
            });
          });
        }
      })
      .catch(console.error);
  }

  render() {
    !this.state.broadcast && this.startPlayback();
    const { broadcast, audioSrc, event } = this.state;
    console.log(`broadcast: `, broadcast && broadcast);
    console.log(`broadcast.isLive: `, broadcast && broadcast.isLive);

    return broadcast ? (
      <Card id="station-broadcast">
        <Image src={
          this.props.stationLogo ?
          this.props.stationLogo
          : 'https://www.fillmurray.com/400/400' } />
        <Card.Content>
        {broadcast.isLive && <Image floated="right" size="tiny" src="/images/isLive.gif" /> }
          <Card.Header>
            {broadcast.name}
          </Card.Header>
          <Card.Description>
          {broadcast.description}
          </Card.Description>
          {
            broadcast &&
              <MediaElement type="listener" event={event} audioSrc={audioSrc} />
          }
        </Card.Content>
      </Card>
    ) : null;
  }
}

const mapState = state => {
  return {
    broadcast: state.broadcast
  };
};

export default connect(mapState)(Player);
