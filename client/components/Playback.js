import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Image, Card, Grid } from 'semantic-ui-react';
import RTCMultiConnection from 'rtcmulticonnection-v3';
import MediaElement from './MediaElement';


class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audioSrc: '',
      event: null,
      broadcast: null,
      isLoaded: false
    };
    this.startPlayback = this.startPlayback.bind(this);
  }

  componentDidMount(){
    return axios
      .get(`/api/broadcasts/${this.props.broadcastId}`)
      .then(res => res.data)
      .then(broadcast => {
        this.setState({broadcast});
      })
      .catch(console.error);
  }

  componentWillUnmount(){
    this.connection &&
      this.connection.close() &&
      this.connection.disconnect();
  }

  startPlayback() {
    const { broadcast } = this.state;

    // If the broadcast is live, creates a new stream,
    // then connects to the live stream by the live stream's broadcastId.
    // If broadcast is not live, retrieves audio from backend.

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
        this.setState({event, isLoaded: true});
      };

      this.connection.join(broadcast.id);

    } else {
      axios.get(`/api/broadcasts/${broadcast.id}/playback`)
      .then(res => res.data)
      .then(audio => {
        const blob = new Blob([new Uint8Array(audio.blob.data)], { type: audio.type});
        const audioURL = window.URL.createObjectURL(blob);
        this.setState({
          audioSrc: audioURL,
          isLoaded: true
        });
      });
    }
  }

  render() {
    const { broadcast, audioSrc, event, isLoaded } = this.state;
    return !broadcast ? null : (
      <Card id="station-broadcast" onClick={() => this.startPlayback()}>
        <Image src={
          broadcast.station.logoUrl ?
          broadcast.station.logoUrl
          : 'https://www.fillmurray.com/400/400' } />
        <Card.Content>
        {broadcast.isLive && <Image floated="right" size="tiny" src="/images/isLive.gif" /> }
          <Card.Header >
            <Grid verticalAlign="middle" divided="vertically">
              <Grid.Row columns={2}>
                <Grid.Column width={13} floated="left">
                  {broadcast.name}
                </Grid.Column>
                <Grid.Column width={3} floated="right">
                  {
                    isLoaded ?
                    <Image size="mini" src="/images/broadcast/play_on.jpg" />
                    : <Image size="mini" src="/images/broadcast/play.jpg" />
                  }
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Card.Header>
          <Card.Description>
          {broadcast.description}
          </Card.Description>
          {
            isLoaded &&
              <MediaElement type="listener" event={event} audioSrc={audioSrc} />
          }
        </Card.Content>
      </Card>
    );
  }
}

const mapState = state => {
  return {
    broadcast: state.broadcast
  };
};

export default connect(mapState)(Player);
