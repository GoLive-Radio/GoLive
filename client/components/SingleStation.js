import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Image } from 'semantic-ui-react';
import { fetchStation } from '../store';
import Playback from './Playback';

export class SingleStation extends Component {
  componentDidMount() {
    this.props.loadStation();
  }

  render() {
    console.log(`this.props: `, this.props);
    const { station } = this.props;
    return station ? (
      <div className="height100 station-wrapper">
        <div className="station-wrapper">
          <Grid>
            <Grid.Row>
              <Grid.Column width={4} className="white-font">
                <Image bordered src={station.logoUrl} />
              </Grid.Column>
              <Grid.Column width={12} className="white-font">
                <h1 className="station-title">{station.name}</h1>
                <p>{station.description}</p>
                <Link
                  className="auto button-link white-font"
                  to="/broadcasts/new-broadcast"
                >
                  Create Broadcast
                </Link>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              {station.broadcasts
                ? station.broadcasts.map(broadcast => {
                  return (
                    <Grid.Column width={4} key={broadcast.id} className="padding-top-large">
                      <Playback
                      key={broadcast.id}
                      broadcastId={broadcast.id}
                      stationLogo={station.logoUrl}
                      />
                    </Grid.Column>
                  );
                }) : null}
            </Grid.Row>
          </Grid>
        </div>
      </div>
    ) : (
      <p>Station you're looking for no longer exists.</p>
    );
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
