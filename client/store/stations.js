import axios from 'axios';
import { NEW_STATION, UPDATE_STATION, createNewStation, updateStation} from './sharedStation';

/**
 * ACTION TYPES
 */
const GET_STATIONS = 'GET_STATIONS';

/**
 * ACTION CREATORS
 */
const getStations = stations => ({
  type: GET_STATIONS,
  stations
});

/**
 * THUNK CREATORS
 */

//get all broadcasts
export const fetchStations = () =>
  dispatch =>
    axios.get('api/stations')
    .then(res => res.data)
    .then(stations => {
      dispatch(getStations(stations));
    })
    .catch(err => console.log(err));

/**
 * INITIAL STATE
 */
const stations = [];

/**
 * REDUCER
 */
export default function(state = stations, action) {
  switch (action.type) {
    case GET_STATIONS:
      return action.stations;
    case NEW_STATION:
      return [...state, action.station];
    case UPDATE_STATION:
      return state.map(station => {
        if (station.id === action.station.id) {
          return action.station;
        } else {
          return station;
        }
      });
    default: return state;
  }
}
