import axios from 'axios';

// ACTION TYPE
const GET_BROADCASTS_BY_STATION = 'GET_BROADCASTS_BY_STATION';

// ACTION CREATORS
export const getBroadcastsByStation = broadcasts => ({
  type: GET_BROADCASTS_BY_STATION,
  broadcasts
});

//THUNK CREATORS

//get all broadcasts by stationId
export const fetchBroadcastsByStationId = id => dispatch =>
  axios
    .get(`/api/broadcasts?stationId=${id}`)
    .then(res => res.data)
    .then(broadcasts => {
      dispatch(getBroadcastsByStation(broadcasts));
    })
    .catch(console.error);

// INITIAL STATE
const initialState = [];

// REDUCER
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case GET_BROADCASTS_BY_STATION:
      return action.broadcasts;
    default:
      return state;
  }
}
