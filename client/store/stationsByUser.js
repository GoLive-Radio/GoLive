import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_STATIONS_BY_USER = 'GET_STATIONS_BY_USER';

/**
 * ACTION CREATORS
 */
const getStationsByUser = stations => ({
  type: GET_STATIONS_BY_USER,
  stations
});

/**
 * THUNK CREATORS
 */

//get all stations by userId
export const fetchStationsByUserId = (id) =>
  dispatch =>
    axios.get(`/api/stations?userId=${id}`)
    .then(res => res.data)
    .then(stations => {
      dispatch(getStationsByUser(stations));
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
    case GET_STATIONS_BY_USER:
      return action.stations;
    default: return state;
  }
}
