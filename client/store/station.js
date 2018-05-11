import axios from 'axios';

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
export const fetchStation = (id) =>
  dispatch =>
    axios.get(`/api/stations/${id}`)
    .then(res => res.data)
    .then(station => {
      dispatch(getStation(station));
    })
    .catch(err => console.log(err));

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
