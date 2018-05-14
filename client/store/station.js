import axios from 'axios';
import history from '../history';
import { NEW_STATION, UPDATE_STATION, createNewStation, updateStation } from './sharedStation';

/**
 * ACTION TYPES
 */
const GET_STATION = 'GET_STATION';

/**
 * ACTION CREATORS
 */
export const getStation = station => ({
  type: GET_STATION,
  station
});

/**
 * THUNK CREATORS
 */
// fetch single station
export const fetchStation = (id) =>
dispatch =>
    axios.get(`/api/stations/${id}`)
    .then(res => res.data)
    .then(station => {
      dispatch(getStation(station));
    })
    .catch(err => console.log(err));

// post new station
export const addStationThunk = (stationData) =>
  dispatch =>
    axios.post('/api/stations', stationData)
    .then(res => res.data)
    .then(newStation => {
      dispatch(createNewStation(newStation));
      history.push(`/stations/${newStation.id}`);
    })
    .catch(console.error);

//update station
export const updateStationThunk = (dataToUpdate, station) =>
  dispatch =>
    axios.put(`/api/stations/${station.id}`, dataToUpdate)
    .then(res => res.data)
    .then(updatedStation => {
      dispatch(updateStation(updatedStation));
      history.push(`/stations/${updatedStation.id}`);
    })
    .catch(console.error);

/**
 * INITIAL STATE
 */
const station = {};

/**
 * REDUCER
 */
export default function(state = station, action) {
  switch (action.type) {
    case GET_STATION:
    case NEW_STATION:
    case UPDATE_STATION:
      return action.station;
    default: return state;
  }
}
