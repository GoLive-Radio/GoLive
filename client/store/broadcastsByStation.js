import axios from 'axios';

// ACTION TYPE
const FETCH_BROADCASTS_BY_STATION = 'FETCH_BROADCASTS_BY_STATION';

// ACTION CREATORS
export const fetchBroadcastsByStation = broadcast => ({
  type: FETCH_BROADCASTS_BY_STATION,
  broadcast
});

//THUNK CREATORS

//get all broadcasts by stationId
export const fetchBroadcastsByStationId = id => dispatch =>
  axios
    .get(`/api/broadcasts?stationId=${id}`)
    .then(broadcasts => {
      dispatch(fetchBroadcastsByStation(broadcasts));
    })
    .catch(console.error);

// INITIAL STATE
const initialState = [];

// REDUCER
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_BROADCASTS_BY_STATION:
      return action.broadcast;
    default:
      return state;
  }
}
