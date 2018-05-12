import React, { Fragment, Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { Card, Icon, Image } from 'semantic-ui-react';
import { fetchStationsByUserId } from '../store';

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    stations: state.stations,
    user: state.user
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    loadMyStations: () => {
      console.log('dispatch props ', ownProps);
      // dispatch(fetchStationsByUserId())
    }
  };
};

class MyStations extends Component {

  componentDidMount(){
    this.props.loadMyStations(this.props.user);
  }

  render(){
    const { stations } = this.props;

    return stations ? (
      <Fragment>
        <h1>My Stations</h1>
        <div className="stations">
        {stations && stations.map(station => {
          return (
            <Card key={station.id} id="my_station">
            <Image src={station.logoUrl} />
            <Card.Content>
            <Card.Header>
            {station.name}
            </Card.Header>
            </Card.Content>
            <Card.Meta>
            {station.tags ? station.tags.map(tag => {
              return (
                <span key={tag} className="date">
                      tags: {tag}
                      </span>
                    );
                  }) : null}
                  </Card.Meta>
                  <Card.Description>
                  {station.description}
                  </Card.Description>
                  <Card.Content extra>
                  <Link to={`/stations/${station.id}`}>
                  <span>View station page</span>
                  </Link>
                  </Card.Content>
                  </Card>
                );
              })}
              </div>
      </Fragment>
    ) : null ;
  }
}

export default connect(mapState, mapDispatch)(MyStations);
