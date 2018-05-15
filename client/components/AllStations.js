import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStations } from '../store';

export class AllStations extends Component {
  componentDidMount() {
    this.props.loadStations();
  }

  render() {
    const {stations} = this.props;
    console.log(stations);
    return stations ? (
      <h1>All Stations</h1>
    ) : null;
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
