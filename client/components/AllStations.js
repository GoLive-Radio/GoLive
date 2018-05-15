import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStations } from '../store';
import { Link } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';

export class AllStations extends Component {
  componentDidMount() {
    this.props.loadStations();
  }

  render() {
    const {stations} = this.props;
    return !stations ? (
      <h1>There are currently no stations on the platform</h1>
    ) : (
      <div className="all-stations-container">
      { stations.map(station => {
        const tags = station.tags.join(', ').trim();
        return (
          <Link key={station.id} to={`/stations/${station.id}`}>
            <Card className="stations-card">
              <Image src={station.logoUrl} className="stations-image-height" />
              <Card.Content>
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
