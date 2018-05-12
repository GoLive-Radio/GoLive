import React, { Component } from 'react';
import axios from 'axios';

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audioSrc: ''
    };
  }

  componentDidMount() {
    return axios
      .get(`/api/broadcasts/${this.props.match.params.broadcastId}/playback`)
      .then(res => res.data)
      .then(audio => {
        const blob = new Blob([new Uint8Array(audio.data)], { type: audio.type});
        const audioURL = window.URL.createObjectURL(blob);
        this.setState({
          audioSrc: audioURL
        });
      });
  }

  render() {
    return (
      <div>
        <p>Test</p>
        {this.state.audioSrc && <audio
          autoPlay={false}
          playsInline={true}
          controls={true}
          ref={element => {
            element.src = this.state.audioSrc;
          }}
        />
        }
      </div>
    );
  }
}
