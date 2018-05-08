import React from 'react';

const MediaElement = props => {
  return props.event.stream ?  (
    <audio
      autoPlay={true}
      playsInline={true}
      controls={true}
      muted={true}
      ref={(element) => {
        if (element){
          element.srcObject = props.event.stream;
        }
      }}
    />
  )
  : null;
};

export default MediaElement;
