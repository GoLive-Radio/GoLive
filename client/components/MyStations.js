import React, { Fragment, Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';
import {fetchStationsByUserId} from '../store';

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    stationsByUser: state.stationsByUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleStationsByUser(id) {
      dispatch(fetchStationsByUserId(id));
    }
  };
};

export class MyStations extends Component {
  componentDidMount() {
    const userId = this.props.user.id;
    this.props.handleStationsByUser(userId);
  }

  render() {
    const stations = this.props.stationsByUser;
    return (
      <div className="myStations full-height">
        <h1 className="margin-top white-font">My Stations</h1>
        <div className="wide-left stations">
          {stations && stations.map(station => {
            return (
              <Card key={station.id} id="my_station" onClick={e => this.props.history.push(`/stations/${station.id}`)}>
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
      </div>
    );
  }
}

export default connect(mapState, mapDispatchToProps)(MyStations);
