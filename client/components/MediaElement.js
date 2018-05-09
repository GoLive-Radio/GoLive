import React, {Component, Fragment} from 'react';
import AudioSpectrum from 'react-audio-spectrum';

class MediaElement extends Component{

  render(){
    console.log('mediaElement ', this.props.event.mediaElement)
    return this.props.event.stream ? (
      <Fragment>
        <audio
          id="stream"
          autoPlay={true}
          playsInline={true}
          controls={true}
          muted={true}
          src={this.props.event.stream.audio}
          // ref={(element) => {
          //   if (element){
          //     element.srcObject = this.props.event.stream;
          //   }
          // }}
        />
        <AudioSpectrum
        id="audio-canvas"
        height={200}
        width={300}
        audioId={'stream'}
        capColor={'red'}
        capHeight={2}
        meterWidth={2}
        meterCount={512}
        meterColor={[
          {stop: 0, color: '#f00'},
          {stop: 0.5, color: '#0CD7FD'},
          {stop: 1, color: 'red'}
        ]}
        gap={4}
        />
      </Fragment>
    )
    : null;
  }
}

export default MediaElement;
