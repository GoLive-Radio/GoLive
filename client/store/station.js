import axios from 'axios';
import history from '../history';

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
export const addStationThunk = (station) =>
  dispatch =>
    axios.post('/api/stations', station)
    .then(res => res.data)
    .then(newStation => {
      dispatch(getStation(newStation));
      history.push(`/api/stations/${newStation.id}`);
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
      return action.station;
    default: return state;
  }
}
