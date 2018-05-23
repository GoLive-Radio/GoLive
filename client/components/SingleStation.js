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
    const { station, user } = this.props;
    console.log('user info ', user)
    return station ? (
      <div className="height100 station-wrapper">
        <div className="station-wrapper">
          <Grid>
            <Grid.Row>
              <Grid.Column width={4} className="white-font">
                <Image rounded className="border-1px" src={station.logoUrl} />
              </Grid.Column>
              <Grid.Column width={12} className="white-font">
                <h1 className="station-title">{station.name}</h1>
                <p className="station-description">{station.description}</p>
                <br />
                <div>
                  {
                    !Object.keys(user).length ? null :
                  <Link className="button-link white-font" to={`/stations/${station.id}/new-broadcast`}>Create New Broadcast</Link>
                  }
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              {station.broadcasts
                ? station.broadcasts.map(broadcast => {
                    return (
                      <Grid.Column
                        width={4}
                        key={broadcast.id}
                        className="padding-top-large"
                      >
                        <Playback
                          key={broadcast.id}
                          broadcastId={broadcast.id}
                          stationLogo={station.logoUrl}
                        />
                      </Grid.Column>
                    );
                  })
                : null}
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
  user: state.user,
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
