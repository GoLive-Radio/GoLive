import React, { Fragment } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { Card, Icon, Image } from 'semantic-ui-react';

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    stations: state.stations
  };
};

const MyStations = ({stations}) => {
  return (
    <Fragment>
      <h1>My Stations</h1>
        {stations && stations.map(station => {
          return (
            <Card key={station.id} id='my_station'>
              <Image src="http://www.101languages.net/images/radio/radio6.png" />
              <Card.Content>
                <Card.Header>
                  {station.name}
                </Card.Header>
              </Card.Content>
              <Card.Meta>
                {station.tags ? station.tags.map(tag => {
                  return (
                    <span key={tag} className='date'>
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
    </Fragment>
  );
};

export default connect(mapState)(MyStations);
