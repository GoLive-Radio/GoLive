import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Header, Image, Modal, Fragment, Card } from 'semantic-ui-react';
import { fetchBroadcast } from '../store';
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
  }

  componentDidMount() {
    const { broadcastId } = this.props.match.params;

    // retrieves the broadcast. If the broadcast is live, creates a new stream, then connects to the live stream by the live stream's broadcastId. If broadcast is not live, retrieves audio from backend.

    return axios
    .get(`/api/broadcasts/${broadcastId}`)
    .then(res => res.data)
    .then(broadcast => {
      this.setState({broadcast});
      if (broadcast.isLive){
        this.connection = new window.RTCMultiConnection();
        console.log('parsed playback connection ', this.connection)
        // this line is VERY_important
        this.connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

        this.connection.mediaConstraints.video = false;
        this.connection.autoCreateMediaElement = false;

        // // if you want audio+video conferencing
        this.connection.session = {
          audio: true,
          video: false
        };

        this.connection.onstream = event => {
          console.log(`onstream func ran`, event.stream);
          this.setState({event});
        };

        //this needs to be fixed so that it is dynamic
        this.connection.join(broadcastId);
        console.log('this is the connection ', this.connection);

      } else {
        axios.get(`/api/broadcasts/${this.props.match.params.broadcastId}/playback`)
        .then(res => res.data)
        .then(audio => {
          const blob = new Blob([new Uint8Array(audio.data)], { type: audio.type});
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
    console.log('playback props ', this.props);
    console.log('state ', this.state)
    const { broadcast, audioSrc } = this.state;
    const IndividualCard = (
      <Card>
        <Image src="https://www.fillmurray.com/400/400" />
        <Card.Content>
          <Card.Header>
            My Neighbor Totoro
          </Card.Header>
          <Card.Description>
            Two sisters move to the country with their father in order to be
            closer to their hospitalized mother, and discover the surrounding
            trees are inhabited by magical spirits.
          </Card.Description>
        </Card.Content>
      </Card>
    );

    return  (
      
      <Modal trigger={IndividualCard}>
        <Modal.Header>Select a Photo</Modal.Header>
        <Modal.Content image>
          <Image wrapped size="medium" src="https://www.fillmurray.com/400/400" />
          <Modal.Description>
            <Header>Default Profile Image</Header>
            <p>We've found the following gravatar image associated with your e-mail address.</p>
            <p>Is it okay to use this photo?</p>
          </Modal.Description>
          {
            broadcast && broadcast.isLive ?
          <MediaElement event={this.state.event} />
          :
            audioSrc && <audio
            autoPlay={false}
            playsInline={true}
            controls={true}
            ref={element => {
              element.src = this.state.audioSrc;
            }}
            />
          }
        </Modal.Content>
      </Modal>
    );
  }
}

const mapState = state => {
  return {
    broadcast: state.broadcast
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    loadBroadcast (){
      dispatch(fetchBroadcast(ownProps.match.params.broadcastId));
    }
  }
}

export default connect(mapState)(Player);
