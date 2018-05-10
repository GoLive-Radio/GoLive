import axios from 'axios';

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
    .then(stations => {
      dispatch(getStations(stations));
    })
    .catch(err => console.log(err));

//get all stations by userId
export const fetchStationsByUserId = (id) =>
    dispatch =>
      axios.get(`/api/stations?userId=${id}`)
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
    default: return state;
  }
}
