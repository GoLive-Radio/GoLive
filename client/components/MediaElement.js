import React from 'react';

const MediaElement = props => {

  // returns an audio element depending on whether it is a live stream
  // playback or archived audio playback

  return props.event ?  (
    <audio
      className="station-media-element"
      autoPlay={props.type === 'broadcaster'}
      playsInline={true}
      controls={props.type !== 'broadcaster'}
      muted={props.type === 'broadcaster'}
      ref={(element) => {
        if (element){
          element.srcObject = props.event.stream;
        }
      }}
    />
  )
  : (
  <audio
    className="station-media-element"
    autoPlay={false}
    playsInline={true}
    controls={true}
    muted={false}
    ref={(element) => {
      if (element){
        element.src = props.audioSrc;
      }
    }}
  />
  );
};

export default MediaElement;
