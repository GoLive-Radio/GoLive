import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStations } from '../store';
import { Link } from 'react-router-dom';
import { Grid, Card, Image } from 'semantic-ui-react';

export class AllStations extends Component {
  componentDidMount() {
    this.props.loadStations();
  }

  render() {
    const {stations} = this.props;

    return stations ? (
      <div className="all-stations">
        <h1 id="all-stations-title">GoLive Stations</h1>
        <div className="all-cast-cards">
        {stations.map(station => {
          const tags = station.tags.join(', ').trim();
          const broadcasts = station.broadcasts;
          return (
            <Link key={station.id} to={`/stations/${station.id}`}>
              <Card className="all-stations-card" id="margin-bottom">
                <Image className="stations-image-height" src={station.logoUrl} />
                <Card.Content>
                  {broadcasts ? broadcasts.map(broadcast => {
                    if (broadcast.isLive) {
                      return (
                        <Image key={broadcast.id} floated="right" size="tiny" src="/images/isLive.gif" />
                      );
                    } else {
                      return null;
                    }
                  }) : null}
                  <Card.Header>
                    {station.name}
                  </Card.Header>
                  <Card.Description>
                    {station.description}
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  {tags ? tags : null}
                </Card.Content>
            </Card>
          </Link>
          );
        })}
        </div>
      </div>
    ) : (
      null
    );
  }
}

/* CONTAINER */
const mapState = state => ({
  stations: state.stations
});

const mapDispatch = dispatch => {
  return {
    loadStations: () => {
      dispatch(fetchStations());
    }
  };
};

export default connect(mapState, mapDispatch)(AllStations);
