import React, {Component} from 'react';
import MediaElement from './MediaElement';

export default class Visualizer extends Component{
  constructor(props){
    super(props);
    this.state = {
      recording: false,
    };
    this.toggleRecord = this.toggleRecord.bind(this);
  }

  toggleRecord(){
    // this.setState({recording: !this.state.recording});
    this.audio.paused ? this.audio.play() : this.audio.pause();
  }

  componentDidMount(){
    console.log('visualizer props ', this.props);
    this.audio = new Audio();
    let { audio } = this;
    console.log('this is the audio ', audio);
    audio.src = '/audio/good-company.mp3';
    audio.controls = false;
    audio.loop = true;
    audio.autoplay = false;

    // Establish all variables that your Analyser will use
    let canvas, ctx, source, context, analyser, fbcArray, bars, barX, barWidth, barHeight;

    // Initialize the MP3 player after the page loads all of its HTML into the window
    window.addEventListener('load', initMp3Player, false);

    function initMp3Player(){
      // document.getElementById('audio_box').appendChild(audio);
      context = new AudioContext(); // AudioContext object instance
      analyser = context.createAnalyser(); // AnalyserNode method
      canvas = document.getElementById('analyser_render');
      ctx = canvas.getContext('2d');
      // Re-route audio playback into the processing graph of the AudioContext
      source = context.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(context.destination);
      frameLooper();
    }
    // frameLooper() animates any style of graphics you wish to the audio frequency
    // Looping at the default frame rate that the browser provides(approx. 60 FPS)
    function frameLooper(){
      window.requestAnimationFrame(frameLooper);
      fbcArray = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(fbcArray);
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
      ctx.fillStyle = '#00CCFF'; // Color of the bars
      bars = 100;
      for (var i = 0; i < bars; i++) {
        barX = i * 3;
        barWidth = 2;
        barHeight = -(fbcArray[i] / 2);
        //  fillRect( x, y, width, height ) // Explanation of the parameters below
        ctx.fillRect(barX, canvas.height, barWidth, barHeight);
      }
    }
  }

  render(){
    return (
      <div className="media">
        <div className="ui tiny image">
            <img onClick={this.toggleRecord} src={this.state.recording ? '/images/record_on.png' : '/images/record.png'} />
        </div>
        <div id="mp3_player">
          <div id="audio_box" />
          <canvas id="analyser_render" />
        </div>
      </div>
    );
  }
}

