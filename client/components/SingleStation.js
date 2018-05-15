import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {Grid, Image} from 'semantic-ui-react';
import { fetchStation } from '../store';
import Playback from './Playback';

export class SingleStation extends Component {
    componentDidMount(){
        this.props.loadStation();
    }

    render() {
        const { station } = this.props;
        return (
          station ?
          <div className="height100">
          <Grid>
            <Grid.Row>
              <Grid.Column width={4} className="white-font">
                <Image src='http://www.101languages.net/images/radio/radio6.png' /> {/*add station.logoUrl*/}
                <h1 className="margin-left">{station.name}</h1>
                <p className="margin-left">{station.description}</p>
              </Grid.Column>
              <Grid.Column width ={12} className="white-font">
                <h2 className="padding-top">Currently playing</h2>
                {/*Add playback here*/}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={4} className="white-font">
                <h1 className="margin-left">By {station.name}</h1>
                {/*Populate archived playbacks here*/}
              </Grid.Column>
              <Grid.Column width={12} className="white-font">
                <h1 className="margin-left">Today</h1>
                <p>Today's live broadcast was the best!!</p>
                <p>{/*Add dynamic updates*/}</p>
                <Link className="auto button-link white-font" to="/broadcasts/new-broadcast">Create Broadcast</Link>
                {/*<Link to="/stations/:stationId/broadcasts/new-broadcasts">Create Broadcast</Link>*/}
                {/*Move this somewhere else*/}
              </Grid.Column>
            </Grid.Row>
            <div className="station-broadcasts" >
              {
                station.broadcasts ? (
                  station.broadcasts.map( broadcast => {
                    return <Playback key={broadcast.id} broadcastId={broadcast.id} stationLogo={station.logoUrl} />;
                  })
                ) : null
              }
            </div>
          </Grid>

          </div>
        : <p>Station you're looking for no longer exists.</p> );
    }
}

/* CONTAINER */
const mapState = state => ({
    station: state.station
});

const mapDispatch = (dispatch, ownProps) => {
    return {
      loadStation: () => {
        const stationId = +ownProps.match.params.stationId;
        dispatch(fetchStation(stationId));
      }
    };
};

export default connect(mapState, mapDispatch)(SingleStation);
